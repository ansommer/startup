const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const fetch = require('node-fetch');
const DB = require('./database.js');

const authCookieName = 'token';
const SPOONACULAR_KEY = process.env.VITE_SPOONACULAR_KEY;

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

//let users = [];
let recipes = [];


// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {  
  console.log(`In API. Creating user ${req.body.email}`);
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  console.log(`In API. Logging in user ${req.body.email}`);
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await DB.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
    await DB.updateUser(user); // in simon it doesn't say await
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});


// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    req.user = user; // attach user to request
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

//post recipe manually
apiRouter.post('/recipes', verifyAuth, (req, res) => {
  const { title, url, description, image, userEmail } = req.body;

  if (!title) return res.status(400).send({ msg: 'Title is required' });

  const newRecipe = {
    id: uuid.v4(),
    title,
    url: url || '#',
    description: description || '',
    image: image || 'default.jpg',
    likes: 0,
    likedBy: [],
    comments: [],
    userEmail: req.user.email, // optional, to track who posted it
  };

  recipes.push(newRecipe);
  res.send(newRecipe);
});


/*post recipe from url
apiRouter.post('/recipes/from-url', verifyAuth, async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).send({ msg: 'URL is required' });

  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/extract?url=${encodeURIComponent(url)}&apiKey=${SPOONACULAR_KEY}`);
    if (!response.ok) throw new Error(`Spoonacular API error: ${response.status}`);

    const data = await response.json();
    const newRecipe = {
      id: uuid.v4(),
      title: data.title || 'Untitled Recipe',
      url: data.sourceUrl || url,
      description: data.summary ? data.summary.replace(/<[^>]*>/g, '') : 'No description available',
      image: data.image || 'default.jpg',
      likes: 0,
      likedBy: [],
      comments: [],
      userEmail: req.user.email,
    };

    recipes.push(newRecipe);
    res.send(newRecipe);
  } catch (err) {
    console.error('Error fetching recipe from URL:', err);
    res.status(500).send({ msg: 'Could not fetch recipe from URL' });
  }
});*/

// Toggle like/unlike
apiRouter.post('/recipes/:id/like', verifyAuth, (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (!recipe) return res.status(404).send({ msg: 'Recipe not found' });

  const userEmail = req.user.email;

  if (!recipe.likedBy) recipe.likedBy = [];

  if (recipe.likedBy.includes(userEmail)) {
    recipe.likes -= 1;
    recipe.likedBy = recipe.likedBy.filter(email => email !== userEmail);
  } else {
    recipe.likes += 1;
    recipe.likedBy.push(userEmail);
  }

  res.send({
    likes: recipe.likes,
    likedByUser: recipe.likedBy.includes(userEmail),
  });
});

// Add a comment
apiRouter.post('/recipes/:id/comment', verifyAuth, (req, res) => {
  const recipe = recipes.find(r => r.id === req.params.id);
  if (!recipe) return res.status(404).send({ msg: 'Recipe not found' });

  const { comment } = req.body;
  if (!comment) return res.status(400).send({ msg: 'Comment cannot be empty' });

  const commentObj = `${comment} --${req.user.email}`;
  recipe.comments.push(commentObj);
  res.send({ comments: recipe.comments });
});


// Get all recipes
apiRouter.get('/recipes', verifyAuth, (req, res) => {
  const userEmail = req.user.email;
  res.send(recipes.map(r => ({
    ...r,
    likedByUser: r.likedBy.includes(userEmail),
  })));
});


// GetIngredients
apiRouter.get('/ingredients', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(404).send({ msg: 'User not found' });
  res.send(user.ingredients || []);
});

// SubmitIngredients
apiRouter.post('/ingredients', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(404).send({ msg: 'User not found' });

  const ingredient = req.body.ingredient;
  if (!ingredient || typeof ingredient !== 'string') {
    return res.send(user.ingredients);
  }

  const normalized = ingredient.trim().toLowerCase();
  if (!user.ingredients.includes(normalized)) {
    user.ingredients.push(normalized);
    await DB.updateUser(user);  // persist to DB
  }

  user.ingredients.sort((a, b) => a.localeCompare(b));
  console.log(`Ingredients for ${user.email}:`, user.ingredients);

  res.send(user.ingredients);
});

// DELETE an ingredient
apiRouter.delete('/ingredients', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (!user) return res.status(404).send({ msg: 'User not found' });

  const ingredientName = req.body.ingredient?.toLowerCase();
  if (!ingredientName) return res.status(400).send({ msg: 'Missing ingredient name' });

  user.ingredients = user.ingredients.filter(i => i !== ingredientName);
  await DB.updateUser(user);  // persist to DB
  console.log(`Ingredients for ${user.email}:`, user.ingredients);

  res.send(user.ingredients);
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});


// updateIngredients considers a new ingredient for inclusion in the ingredients.
function updateIngredients(newIngredient) {
  if (!newIngredient || typeof newIngredient !== 'string') {
    return ingredients;
  }

  const normalized = newIngredient.trim().toLowerCase();

  // Only add if it doesn't already exist
  if (!ingredients.some(i => i.toLowerCase() === normalized)) {
    ingredients.push(normalized);
  }

  // keep alphabetically sorted
  ingredients.sort((a, b) => a.localeCompare(b));

  return ingredients;
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
    ingredients: [],
  };
  await DB.addUser(user);
  //console.log('Current users:', users.map(u => u.email));
  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return DB.getUserByToken(value);
  }
  return DB.getUser(value);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

app.listen(port, '0.0.0.0', () => {
  console.log(`Listening on port ${port}`);
});