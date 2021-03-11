const Movie = require("../models/Movie");

class MovieController {
  static async findMovies(req, res, next) {
    try {
      const movies = await Movie.find()
      res.json(movies)
    } catch (error) {
      next(error)
    }
  }
  static async createMovie (req,res,next) {
    try {
      const movie = await Movie.create(req.body)
      res.json(movie)
    } catch (error) {
      next(error)
    }
  }
  static async updateMovie (req,res,next) {
    try {
      const movie = await Movie.update(req.body)
      res.json(movie)
    } catch (error) {
      next(error)
    }
  }
  static async deleteMovie (req,res,next) {
    const id = req.params.id
    try {
      const movie = await Movie.destroy(id)
      res.json(movie)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MovieController