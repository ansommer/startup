const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');

const authCookieName = 'token';

let users = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);



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
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};


// GetIngredients
apiRouter.get('/ingredients', verifyAuth, (req, res) => {
  const user = users.find(u => u.token === req.cookies[authCookieName]);
  res.send(user.ingredients);
});

// SubmitIngredients
apiRouter.post('/ingredients', verifyAuth, (req, res) => {
  const user = users.find(u => u.token === req.cookies[authCookieName]);
  const ingredient = req.body.ingredient;
  if (!ingredient || typeof ingredient !== 'string') {
    return res.send(user.ingredients);
  }

  const normalized = ingredient.trim().toLowerCase();
  if (!user.ingredients.includes(normalized)) {
    user.ingredients.push(normalized);
  }

  user.ingredients.sort((a, b) => a.localeCompare(b));
  console.log(`Ingredients for ${user.email}:`, user.ingredients);

  res.send(user.ingredients);
});

// DELETE an ingredient
apiRouter.delete('/ingredients', verifyAuth, (req, res) => {
  const user = users.find(u => u.token === req.cookies[authCookieName]);
  const ingredientName = req.body.ingredient?.toLowerCase();
  if (!ingredientName) return res.status(400).send({ msg: 'Missing ingredient name' });

  user.ingredients = user.ingredients.filter(i => i !== ingredientName);
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
  users.push(user);
  console.log('Current users:', users.map(u => u.email));
  return user;
}

async function findUser(field, value) {
  if (!value) return null;

  return users.find((u) => u[field] === value);
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