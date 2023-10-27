const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const morgan = require('morgan');
const app = express();  
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;
const Genres = Models.Genres;
const Directors = Models.Directors;

mongoose.connect('mongodb://localhost:27017/cfDB', { useNewUrlParser: true, useUnifiedTopology: true }).then((done) => console.log("Connected to mongo")).catch((e) => console.log("Error connecting", e.name));


app.use(bodyParser.json());

app.use(morgan("common"));


// CREATE
app.post('/users', (req, res) => {
	Users.findOne({Username: req.body.Username })
    .then((user) => { 
	   if (user) {
		  return res.status(400).send(req.body.Username + "already exists")
     } else {
		Users.create({
		  Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Birthday: req.body.Birthday,
	  })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
	}
})
})

// UPDATE
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user =Users.find( user => User.id == id );

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
      res.status(400).send('no such user')
  }
})

// POST
app.post('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
 
  let user =Users.find( user => User.id == id );

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;  
  } else {
      res.status(400).send('no such user')
  }
})

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
  const { id, movieTitle } = req.params;
 
  let user =Users.find( user => user.id == id );

  if (user) {
    user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
    res.status(200).send(`${movieTitle} has been removed from user ${id}'s array`);;  
  } else {
      res.status(400).send('no such user')
  }
})

// DELETE
app.delete('/Users/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + " was not found");
      } else {
        res.status(200).send(req.params.Username + " was deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
})

// READ

app.get('/', (req, res) => {
  res.send("Welcome to myflix!");

});

app.get('/movies', (req, res) => {
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

app.get('/users', function (req, res) {
  Users.find()
    .then(function (users) {
      res.status(201).json(users);
    });
});

// READ
app.get('/movies/:title', (req, res) => {
  Movies.findOne ({ title: req.params.title })
    .then((movie) => {
      res.json(movie);
    })
    .catch((err) => {
      console.error(err);
    });
});

// READ
app.get("/movies/genre/:genreName", (req, res) => {
  Movies.findOne({ "Genre.Name": req.params.genreName })
    .then((genre) => {
      res.json(genre);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
});

// READ
app.get('/director/:name', (req, res) => {
  Movies.findOne({ 'Director.Name': req.params.name })
    .then((director) => {
      res.json(director);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + err);
    });
  });

// READ
app.get('/movies/director/:directorImage', (req, res) => {
  const { directorImage } = req.params;
  const directorPic = topMovies.find( movie => movie.director.imageURL === directorImage ).director;

  if (directorPic) {
    res.status(200).json(directorPic);
  } else {
    res.status(400).send("no picture")
  }
})

// express.static
app.use(express.static('public'));

app.get('/documentation', (req, res) => {                  
  console.log('Documentation Request');
  res.sendFile('public/documentation.html', {root: __dirname});
});

// Morgan Middleware
app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('My top ten movies');
});

app.get('/secreturl', (req, res) => {
  res.send('This is a secret url with super top-secret content.');
});

app.listen(8080, () => {
  console.log('Your app is listening on port 8080.');
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});