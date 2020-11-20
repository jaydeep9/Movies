const pool = require("../config/database");
const moment = require('moment');



function addMoviesIntoLocalDb(data) {
    return new Promise((resolve, reject) => {
        pool.query(
            `INSERT INTO movies 
            (
                title,
                released_year,
                rating, 
                imdb_id,
                genres
            ) 
            VALUES (?,?,?,?,?)`,
            [
                data.title, 
                `${moment(data.released).format('YYYY')}`, 
                data.rating, 
                data.imdbid, 
                data.genres
            ],
            (error, results) => {
            if (error) {
            reject(error);
            }
            resolve(results.affectedRows);
        });
    });
}
function checkMovieIsExists(movie) {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM movies WHERE title = ?",
      [movie],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}
function updateMovieData(movieId, data) {
  // console.log('genres-->',data);
  return new Promise((resolve, reject) => {
    movieData = {
      rating: data.rating,
      genres: data.geners,
    };
    pool.query(
      "UPDATE movies SET ? WHERE id = ?",
      [movieData, movieId],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.affectedRows);
      }
    );
  });
}
function getDataSearchBy(search) {
  return new Promise((resolve, reject) => {
    pool.query(
        `SELECT * FROM movies 
            WHERE 
        (
            id = ?
            or released_year = ?
            or rating Like ? 
            or genres Like ?
        )`,
        [
            
            search,
            search,
            `%${search}%`,
            `%${search}%`
        ],
        (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results);
      }
    );
  });
}
function getReleasedYearRange(data){
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM movies WHERE released_year BETWEEN ? AND ? ",
            [
                data.from_year,
                data.to_year,
            ],
            (error, results) => {
            if (error) {
              reject(error);
            }
            resolve(results);
          }
        );
    });
}

module.exports = {
  addMoviesIntoLocalDb,
  checkMovieIsExists,
  updateMovieData,
  getDataSearchBy,
  getReleasedYearRange
};
