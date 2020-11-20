const { body } = require('express-validator');
// const constants = require('../../utils/constants');
const { 
    checkMovieIsExists
    // checkUserName
} = require('../../services/movieService');

exports.validate = (method) => {
    switch (method) {
        
        case 'add': {
            return [
                body('movie', 'The movie field is required.')
                .exists()
                .custom(async (movie,{req}) => {
                    const value = await checkMovieIsExists(movie);
                    if (value.length > 0) {
                        throw new Error('Movie is already in use.');
                    }
                })
                .trim()
            ];
        }
        case 'update': {
            return [
                body('rating','The rating field is required.')
                .exists()
                .trim(),
                body('geners','The geners field is required.')
                .exists()
                .trim()
            ]
        }
        case 'search': {
            return [
                body('search','The search field is required.')
                .exists()
                .trim()
            ]
        }
        case 'range': {
            return [
                body('from_year','The from_year field is required.')
                .exists()
                .trim(),
                body('to_year','The to_year field is required.')
                .exists()
                .trim()
            ]
        }
        default:
            return [];
    }
};
    