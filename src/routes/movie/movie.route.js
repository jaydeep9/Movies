const express = require('express');
const movieValidation = require('./movie.validation')
const router = express.Router();

const { 
    addMovie,
    updateMovie,
    searchMovie,
    rangeMovie
} = require('../../controllers/movie.controller');

router.post('',movieValidation.validate('add'),addMovie);
router.put('/:id',movieValidation.validate('update'),updateMovie);
router.get('/search',movieValidation.validate('search'),searchMovie);
router.get('/range',movieValidation.validate('range'),rangeMovie);


module.exports = router;