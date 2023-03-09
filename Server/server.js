const express = require('express');
const cors = require('cors');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

let movies = [
    { id: uuidv4(), title: 'The Godfather', year: 1972, director: 'Francis Ford Coppola', genre: 'Crime, Drama' },
    { id: uuidv4(), title: 'The Shawshank Redemption', year: 1994, director: 'Frank Darabont', genre: 'Drama' },
    { id: uuidv4(), title: 'The Dark Knight', year: 2008, director: 'Christopher Nolan', genre: 'Action, Crime, Drama' },
  ];

  app.get('/movies', (req, res) => {
    res.json(movies);
  });

 app.get('/movies/:id', (req, res) => {
    const id =  parseInt(req.params.id);
    const movie = movies.find(movie => movie.id)
    if (movie) {
        res.json(movie);
    } else{
        res.status(404).send('Movie not found');
    }
 });

 app.post('/movies', (req, res) => {
    const movie = req.body;
    if(!movie.title || !movie.director || !movie.genre || !movie.year) {
        return res.status(400).json({error: 'Missing required fields'});
    }
    movie.id = uuidv4();
    movies.push(movie);
    res.json(movie);
 });

 app.put('/movies/:id', (req, res) => {
    const id = req.params.id;
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex >= 0) {
        const updatedMovie = {...movies[movieIndex], ...req.body};
        movies[movieIndex] = updatedMovie;
        res.json(updatedMovie);
    } else {
        res.status(404).send('Movie not found');
    }
});

app.delete('/movies/:id', (req, res) => {
    const id = req.params.id;
    const movieIndex = movies.findIndex(movie => movie.id === id)
    if (movieIndex >= 0) {
        movies.splice(movieIndex, 1);
        res.sendStatus(204);
    } else {
        res.status(404).send('Movie not found');
    }
});
 

 const PORT = 3001;
 app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
 });