const axios = require('axios');
const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig');

const { authenticate } = require('../auth/authenticate');
const { generateToken } = require('../auth/tokenService');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/upload', authenticate, addStarship);
  server.post('/api/login', login);
  server.get('/api/starships', authenticate, getStarships);
  server.get('/api/users', authenticate, getUsers);
  server.put('/api/images/:id', authenticate, updateStarship);
};

//******************** REGISTER NEW USER ******************/
function register(req, res) {
  // implement user registration
  const { username, password } = req.body;
  const creds = { username, password };
  const hash = bcrypt.hashSync(creds.password, 10);
  creds.password = hash;

  db('users')
    .insert(creds)
    .then(ids => {
      const id = ids[0];

      db('users')
        .where({ id })
        .first()
        .then(user => {
          const token = generateToken(user);
          res
            .status(201)
            .json({
              id: user.id,
              token,
              message: 'User registration sucessful',
            })
            .catch(err =>
              res
                .status(500)
                .json({ message: 'Internal Server ERROR! Unable to register' }),
            );
        })
        .catch(err =>
          res.status(500).json({ message: 'Server ERROR! Unable to register' }),
        );
    });
}

//******************** ADD STARSHIP ******************/
function addStarship(req, res) {
  const { name, imageUrl, starship_class } = req.body;
  const data = { name, imageUrl, starship_class };

  if (!name || !imageUrl || !starship_class) {
    return res.status(417).json({
      error:
        'A Name, imageUrl and starship_class are REQUIRED to add content to the database.',
    });
  }
  db('spaceships')
    .insert(data)
    .then(image => {
      res.status(200).json({ data, message: 'Data added sucessfully' });
    })
    .catch(err => {
      res.status(500).json({
        error: `Data with the name: ${
          req.body.name
        } already exists in the database.`,
      });
    });
}

//******************** LOGIN USER ******************/
function login(req, res) {
  // implement user login
  const { username, password } = req.body;
  const creds = { username, password };

  db('users')
    .where({ username: creds.username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(creds.password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}! Token saved...`,
          token,
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials, try again...' });
      }
    })
    .catch(err =>
      res.status(500).json({
        message: 'No valid user credentials provided, please register...',
      }),
    );
}

//******************** GET STARSHIPS ******************/
function getStarships(req, res) {
  db('spaceships')
    .then(ship => {
      res.json(ship);
    })
    .catch(err => res.send(err));
}

//******************** GET ALL USERS ******************/
function getUsers(req, res) {
  db('users')
    .select('id', 'username', 'password')
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
}

//************************** UPDATE STARSHIP *************************/
function updateStarship(req, res) {
  const changes = req.body;
  db('spaceships')
    .where({ id: req.params.id })
    .update(changes)
    .then(didUpdate => {
      didUpdate
        ? res
            .status(200)
            .json({ message: 'Data update sucessfull', updated: changes })
        : res
            .status(404)
            .json({ error: 'The Image with the specified ID does not exist.' });
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ error: `The Image information could not be modified.` });
    });
}
