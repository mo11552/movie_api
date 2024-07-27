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

// mongoose.connect( "mongodb://localhost:27017/cfDB", { useNewUrlParser: true, useUnifiedTopology: true });

 mongoose.connect( process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect( 'mongodb+srv://myFlixDbAdmin:CYa2WRH5zFT42yC9@myflixdb.a5vcyno.mongodb.net/?retryWrites=true&w=majority&appName=myFlixDB', { useNewUrlParser: true, useUnifiedTopology: true });


// "mongodb://ac-5jwdoc9-shard-00-00.a5vcyno.mongodb.net:27017,ac-5jwdoc9-shard-00-01.a5vcyno.mongodb.net:27017,ac-5jwdoc9-shard-00-02.a5vcyno.mongodb.net:27017/?replicaSet=atlas-2sjqb8-shard-0" --ssl --authenticationDatabase admin --username myFlixDbAdmin --password CYa2WRH5zFT42yC9



app.use(bodyParser.json());

app.use(morgan("common"));

const cors = require('cors');

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

 let auth = require('./auth')(app);

 const passport = require('passport');
 require('./passport');


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
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  let user = await User.findOne({ _id: id });

  if (user) {
    user.name = updatedUser.name;
    res.status(200).json(user);
  } else {
      res.status(400).send('no such user')
  }
})

// POST
app.post('/users/:id/:movieTitle', async (req, res) => {
  const { id, movieTitle } = req.params;
 
  let user = await User.findOne({ _id: id });

  if (user) {
    user.favoriteMovies.push(movieTitle);
    res.status(200).send(`${movieTitle} has been added to user ${id}'s array`);;  
  } else {
      res.status(400).send('no such user')
  }
})

// DELETE
app.delete('/users/:id/:movieTitle', async (req, res) => {
  const { id, movieTitle } = req.params;
 
  let user = await User.findOne({ _id: id });

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
  console.log('work?')
  res.send("Welcome");

});

app.get('/movies', passport.authenticate('jwt',{ session: false }), async (req, res) => {
  console.log('Does this work?')
  Movies.find()
    .then((movies) => {
      res.status(201).json(movies);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error: " + error);
    });
});

app.get('/movies',(req, res) => {
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
      rhes.status(500).send("Error: " + err);
    });
});

// READ
app.get("/director/:name", (req, res) => {
  Movies.findOne({ "director.name": req.params.name })
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

const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});

//Update user info/protect
app.post('/users', async (req, res) => {
  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username }) // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.put('/users/:Username', async (req, res) => {
    // CONDITION TO CHECK ADDED HERE
    if(req.user.Username !== req.params.Username){
        return res.status(400).send('Permission denied');
    }
    // CONDITION ENDS
    await Users.findOneAndUpdate({ Username: req.params.Username }, {
        $set:
        {
            Username: req.body.Username,
            Password: req.body.Password,
            Email: req.body.Email,
            Birthday: req.body.Birthday
        }
    },
        { new: true }) // This line makes sure that the updated document is returned
        .then((updatedUser) => {
            res.json(updatedUser);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error: ' + err);
        })
});