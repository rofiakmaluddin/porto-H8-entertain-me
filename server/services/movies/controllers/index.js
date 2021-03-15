const Movie = require("../models");

class MovieController {
  static async findMovies(req, res, next) {
    try {
      const movies = await Movie.find()
      res.json(movies)
    } catch (error) {
      next(error)
    }
  }
  static async findOneMovies(req, res, next) {
    const id = req.params.id
    try {
      const movies = await Movie.findOne(id)
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
    const id = req.params.id
    const { title, overview, post_path, popularity, tags } = req.body
    try {
      const movie = await Movie.update(id, { title, overview, post_path, popularity, tags })
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