const imdb = require('imdb-api');
const { validationResult } = require('express-validator');
const {
    addMoviesIntoLocalDb,
    updateMovieData,
    getDataSearchBy,
    getReleasedYearRange
} = require('../services/movieService');


async function addMovie(req,res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const parsedError = errors.array();
        return res.status(400).json({
            success: false,
            data:parsedError
        });
    };
    try{
        const movieName = req.body.movie;
        const movie = await imdb.get({name: movieName}, 
        {apiKey: 'f6790cea', timeout: 30000});
        console.log('movie-->',movie.title,movie.released,movie.rating,movie.imdbid,movie.genres);
    
        const localMovie = await addMoviesIntoLocalDb(movie);
        console.log('localMovie',localMovie);
        if(localMovie > 0){
            return res.status(200).json({
                success: true,
                message: 'One Movie added to Database successfully',
                data: movie
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            data: err
        });
    }
}
async function updateMovie(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const parsedError = errors.array();
        return res.status(400).json({
            success: false,
            data:parsedError
        });
    };
    try{
        const movieId = req.params.id;
        const data = req.body;
        const movieUpdate = await updateMovieData(movieId, data);
        if(movieUpdate > 0 ){
            return res.status(200).json({
                success: true,
                message: 'Record Has been updated.',
                data:data
            });
        }
    }
    catch(err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            data: err
        });
    }
}
async function searchMovie(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const parsedError = errors.array();
        return res.status(400).json({
            success: false,
            data:parsedError
        });
    };
    try{
        const search = req.body.search;
        const searchBy = await getDataSearchBy(search);
        return res.status(200).json({
            success: true,
            message: 'Success.',
            data:searchBy
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            data: err
        });
    }
}
async function rangeMovie(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const parsedError = errors.array();
        return res.status(400).json({
            success: false,
            data:parsedError
        });
    };
    try{
        const data = req.body;
        const searchBy = await getReleasedYearRange(data);
        return res.status(200).json({
            success: true,
            message: 'Success.',
            data:searchBy
        });
    }catch(err){
        console.log(err);
        return res.status(400).json({
            success: false,
            data: err
        });
    }
}

module.exports = {
    addMovie,
    updateMovie,
    searchMovie,
    rangeMovie
};