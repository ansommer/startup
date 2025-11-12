const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('startupUser');
const recipeCollection = db.collection('recipe');


// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  try {
    await db.command({ ping: 1 });
    console.log(`Connect to database`);
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function addUser(startupUser) {
  await userCollection.insertOne(startupUser);
}

async function updateUser(startupUser) {
  await userCollection.updateOne({ email: startupUser.email }, { $set: startupUser });
}

async function addRecipe(recipe) {
  await recipeCollection.insertOne(recipe);
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  addRecipe
};
