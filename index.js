const express = require('express');
  morgan = require('morgan');

const app = express();

let topMovies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    year: '2001'
  },
  {
    title: 'The GodFather',
    year: '1972'
  },
  {
    title: 'Scarface',
    year: '1983'
  },
  {
    title: 'GoodFellas',
    year: '1990'
  },
  {
    title: 'Training Day',
    year: '2001'
  },
  {
    title: 'The Wood',
    year: '1999'
  },
  {
    title: 'The GodFather II',
    year: '1974'
  },
  {
    title: 'Rush Hour',
    year: '1998'
  },
  {
    title: 'Juice',
    year: '1992'
  },
  {
    title: 'Coming To America',
    year: '1988'
  },
];

// READ
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
})

// READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = movies.find( movie => movie.Title === title);

  if (movie) {
  	res.status(200).json(movie);
  } else {
  	res.status(400).send("no such movie")
  }
});

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