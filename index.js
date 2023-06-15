const express = require('express');
  morgan = require('morgan');

const app = express();

let topMovies = [
  {
    title: 'Harry Potter and the Sorcerer\'s Stone',
    description: 'An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world. On his eleventh birthday, Harry Potter discovers that he is no ordinary boy.',
    genre: {
    	name: 'Fantasy',
    	description: 'imaginative fiction dependent for effect on strangeness of setting and of characters, such as supernatural or unnatural beings.'
    },
    director: {
    	name:'Chris Columbus',
    	bio:'Chris Joseph Columbus is an American movie director, producer and screenwriter. His most successful movies are Harry Potter and the Philosophers Stone, Harry Potter and the Chamber of Secrets, Mrs. Doubtfire, and Home Alone.',
    	birth:'September 10, 1958'
    },
    imageURL: "images/Harry_Potter.jpeg"
  },
  {
    title: 'The GodFather',
    description: 'It is the first installment in The Godfather trilogy, chronicling the Corleone family under patriarch Vito Corleone from 1945 to 1955. It focuses on the transformation of his youngest son, Michael Corleone, from reluctant family outsider to ruthless mafia boss.',
    genre: {
    	name: 'Drama',
    	description: 'stories with high stakes and many conflicts. They are plot driven and demand that every character and scene move the story forward.'
  },
  director: {
    	name: 'Francis Ford Coppola',
    	bio: 'Franicis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s.',
    	birth: 'April 7, 1939 '
    },
    imageURL: "images/the_godfather.jpeg"
  },
  {
    title: 'Scarface',
    description: 'Loosely based on the 1929 novel of the same name and serving as a loose remake of the 1932 film, it tells the story of Cuban refugee Tony Montana, who arrives penniless in Miami during the Mariel boatlift and becomes a powerful drug lord.',
    genre: {
    	name: 'Drama',
    	description: 'stories with high stakes and many conflicts. They are plot driven and demand that every character and scene move the story forward.'
  },
  director: {
    	name: 'Brian De Palma',
    	bio: 'Brian Russell De Palma is an American film director and screenwriter. With a career spanning over 50 years, he is best known for his work in the suspense, crime and psychological thriller genres.',
    	birth: 'September 11, 1940'
    },
    imageURL: "images/scarface.jpeg"
  },
  {
    title: 'GoodFellas',
    description: 'The lowly, blue-collar side of the New York Italian mafia is explored in this crime biopic of wiseguy Henry Hill. As he makes his way from strapping young petty criminal, to big-time thief, to middle aged cocaine addict and dealer, the film explores in detail the rules and traditions of organized crime.',
    genre: {
    	name: 'Drama',
    	description: 'stories with high stakes and many conflicts. They are plot driven and demand that every character and scene move the story forward.'
  },
  director: {
    	name: 'Martin Scorsese',
    	bio: 'Martin Charles Scorsese was born in Flushing, New York. Martin Scorsese is known for his gritty, meticulous filmmaking style and is widely considered one of the most important directors of all time. His passion for films started at a young age, as he was an 8 year old, pint sized filmmaker',
    	birth: 'November 17, 1942'
    },
    imageURL: "images/goodfellas.jpg"
  },
  {
    title: 'Training Day',
    description: 'A rookie cop spends his first day as a Los Angeles narcotics officer with a rogue detective who is not what he appears to be. He is just got one day to prove himself and he is a little anxious. He should be. Today is going to be the toughest of his life.',
    genre: {
    	name:'Action',
    	description: 'Movies in the action genre are fast-paced and include a lot of action like fight scenes, chase scenes, and slow-motion shots. They can feature superheroes, martial arts, or exciting stunts. These high-octane films are more about the execution of the plot rather than the plot itself.'
  },
  director: {
    	name: 'Antoine Fuqua',
    	bio: 'Antoine Fuqua is an American filmmaker, known for his work in the action and thriller genres. He was originally known as a director of music videos, and made his film debut in 1998 with The Replacement Killers. His critical breakthrough was the 2001 crime thriller Training Day.',
    	birth: 'May 30, 1965'
    },
    imageURL: "images/training_day.jpg"
  },
  {
    title: 'The Wood',
    description: 'While dealing with a friends cold feet on his wedding day, a writer reminisces about his youth with his best friends. While dealing with a friends cold feet on his wedding day, a writer reminisces about his youth with his best friends.',
    genre: {
    	name:'Romance',
    	description: 'romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion, and the affectionate romantic involvement of the main characters.'
  },
  director: {
    	name: 'Rick Famuyiwa',
    	bio: 'Rick Famuyiwa is an American filmmaker and television director. He is best known for the films The Wood, Brown Sugar, and Dope, as well for his work on the television series The Mandalorian.',
    	birth: 'June 18, 1973'
    },
    imageURL: "images/the_wood.jpeg"
  },
  {
    title: 'The GodFather II',
    description: 'The Godfather: Part II juxtaposes two stories: that of Michael Corleone in the years after he becomes head of the Corleone family business and that of his father, Vito Corleone, as a young man.',
    genre: {
    	name: 'Drama',
    	description: 'stories with high stakes and many conflicts. They are plot driven and demand that every character and scene move the story forward.'
  },
  director: {
    	name: 'Franicis Ford Coppola',
    	bio: 'Franicis Ford Coppola is an American film director, producer, and screenwriter. He is considered one of the major figures of the New Hollywood filmmaking movement of the 1960s and 1970s.',
    	birth: 'April 7, 1939 '
    },
    imageURL: "images/godfather2.jpg"
  },
  {
    title: 'Rush Hour',
    description: 'A loyal and dedicated Hong Kong Inspector teams up with a reckless and loudmouthed L.A.P.D. detective to rescue the Chinese Consuls kidnapped daughter, while trying to arrest a dangerous crime lord along the way.',
    genre: {
    	name: 'Comedy',
    	description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter',
  },
  director: {
    	name: 'Brett Ratner',
    	bio: 'Brett Ratner is an American film director and producer. He directed the Rush Hour film series, The Family Man, Red Dragon, X-Men: The Last Stand, and Tower Heist. He is also a producer of several films, including the Horrible Bosses series, The Revenant and War Dogs.',
    	birth: ' March 28, 1969'
    },
    imageURL: "images/rush_hour.jpg"
  },
  {
    title: 'Juice',
    description: 'The film touches on the lives of four black youths growing up in Harlem, following their day-to-day activities, their struggles with police harassment, rival neighborhood gangs and their families.', 
    genre: {
    	name:'Drama',
    	description:'stories with high stakes and many conflicts. They are plot driven and demand that every character and scene move the story forward.'
  },
  director: {
    	name: 'Ernest Dickerson',
    	bio: 'Ernest Roscoe Dickerson is an American director, cinematographer, and screenwriter of film, television, and music videos.',
    	birth: 'June 25, 1951'
    },
    imageURL: "images/juice.jpeg"
  },
  {
    title: 'Coming To America',
    description: 'An extremely pampered African prince travels to Queens, New York and goes undercover to find a wife that he can respect for her intelligence and strong will. A noble, adventurous prince and his valet agree to find love in the Big Apple against his fathers wishes.',
    genre: {
    	name: 'Comedy',
    	description: 'Comedy is a genre of fiction that consists of discourses or works intended to be humorous or amusing by inducing laughter'
  },
  director: {
    	name: 'John Landis',
    	bio: 'John David Landis is an American filmmaker and actor. He is best known for the comedy films that he has directed such as The Kentucky Fried Movie, National Lampoons Animal House, The Blues Brothers, An American Werewolf in London, Trading Places, Three Amigos, Coming to America and Beverly Hills Cop III, and for directing Michael Jacksons music videos for Thriller and Black or White.',
    	birth: 'August 3, 1950'
    },
    imageURL: "images/coming_to_america.jpg"
  },
];

// READ
app.get('/movies', (req, res) => {
  res.status(200).json(topMovies);
})

// READ
app.get('/movies/:title', (req, res) => {
  const { title } = req.params;
  const movie = topMovies.find( movie => movie.title === title);

  if (movie) {
  	res.status(200).json(movie);
  } else {
  	res.status(400).send("no such movie")
  }
})

// READ
app.get('/movies/genre/:genreName', (req, res) => {
  const { genreName } = req.params;
  const genre = topMovies.find( movie => movie.genre.name === genreName ).genre;

  if (genre) {
  	res.status(200).json(genre);
  } else {
  	res.status(400).send("no such genre")
  }
})

// READ
app.get('/movies/director/:directorName', (req, res) => {
  const { directorName } = req.params;
  const director = topMovies.find( movie => movie.director.name === directorName ).director;

  if (genre) {
  	res.status(200).json(genre);
  } else {
  	res.status(400).send("no such genre")
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