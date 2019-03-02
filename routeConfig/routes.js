const axios = require('axios');
const bcrypt = require('bcryptjs');

const db = require('../data/dbConfig');

const { authenticate } = require('../auth/authenticate');
const { generateToken } = require('../auth/tokenService');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/upload', authenticate, postImage);
  server.post('/api/login', login);
  server.get('/api/starships', authenticate, getStarships);
  server.get('/api/starships/page=2', authenticate, nextStarships);
  server.get('/api/users', authenticate, getUsers);
  server.get('/api/images', authenticate, getImages);
  server.put('/api/images/:id', authenticate, updateImages);
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

//******************** POST IMAGES ******************/
function postImage(req, res) {
  const { name, imageUrl } = req.body;
  const data = { name, imageUrl };

  if (!name || !imageUrl) {
    return res.status(417).json({
      error: 'name and url are REQUIRED to update database.',
    });
  }
  db('images')
    .insert(data)
    .then(image => {
      res.status(200).json({ data, message: 'Image added sucessfully' });
    })
    .catch(err => {
      res.status(500).json({
        error: `An image with the name: ${
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

//******************** GET 10 STARSHIPS ******************/
function getStarships(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://swapi.co/api/starships', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Starships', error: err });
    });
}

//******************** GET NEXT 10 STARSHIPS ******************/
function nextStarships(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://swapi.co/api/starships/?page=2', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Starships', error: err });
    });
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

//******************** GET ALL IMAGES ******************/
function getImages(req, res) {
  db('images')
    .select('id', 'name', 'imageUrl')
    .then(images => {
      res.json(images);
    })
    .catch(err => res.send(err));
}

//************************** UPDATE IMAGES *************************/
function updateImages(req, res) {
  const changes = req.body;
  db('images')
    .where({ id: req.params.id })
    .update(changes)
    .then(didUpdate => {
      didUpdate
        ? res
            .status(200)
            .json({ message: 'Data update sucessful', updated: changes })
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
