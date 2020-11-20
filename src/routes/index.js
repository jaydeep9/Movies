const express = require('express');
// const imdb = require('imdb-api');
const movieRoute = require('./movie/movie.route');
const checkConnection = require('../services/connectionService');

const router = express.Router();


router.get('/',async (req,res) => {
    const row = await checkConnection();
    console.log('row-->',row);
    return res.status(200).json({
        success: true,
        message: 'success',
        data: row
    });
});

router.use('/movie', movieRoute);

/* router.get('/imdb',async (req,res) => {
    const movie = await imdb.get({name: 'Scam 1992: The Harshad Mehta Story'}, 
    {apiKey: 'f6790cea', timeout: 30000});
    console.log('movie-->',movie);
    return res.status(200).json({
        success: true,
        message: 'success',
        data: movie
    });
}) */

module.exports = router;
