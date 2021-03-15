const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

class MovieController {
  static async findMovies (req, res, next) {
    try {
      const moviesData = await redis.get('movies:data')
      if (moviesData) {
        res.status(200).json(JSON.parse(moviesData))
      } else {
        axios.get('http://localhost:4001')
          .then(({ data }) => {
            redis.set("movies:data", JSON.stringify(data))
            res.status(200).json(data)
          })
          .catch(err => {
            next(err)
          })
      }
    } catch (error) {
      next(error)
    }
  }
  static async findOneMovies (req, res, next) {
    try {
      await redis.del('movies:data')
      const id = req.params.id
      axios.get(`http://localhost:4001/${id}`)
        .then(({ data }) => {
          res.status(200).json(data)
        })
        .catch(err => {
          next(err)
        })
    } catch (error) {
      next(error)
    }
  }
  static async createMovie (req, res, next) {
    try {
      await redis.del('movies:data')
      const { title, overview, poster_path, popularity, tags } = req.body
      axios({
        method: 'POST',
        url: 'http://localhost:4001',
        data: { title, overview, poster_path, popularity, tags }
      }).then(({ data }) => {
        res.status(201).json(data)
      })
    } catch (error) {
      next(error)
    }

  }
  static async updateMovie (req, res, next) {
    try {
      await redis.del('movies:data')
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body
      axios({
        method: 'PUT',
        url: `http://localhost:4001/${id}`,
        data: { title, overview, poster_path, popularity, tags }
      }).then(({ data }) => {
        res.status(200).json(data)
      })
    } catch (error) {
      next(error)
    }
  }
  static async deleteMovie (req, res, next) {
    try {
      await redis.del('movies:data')
      const id = req.params.id
      axios.delete(`http://localhost:4001/${id}`)
        .then(({ data }) => {
          res.status(200).json(data)
        })
        .catch(err => {
          next(err)
        })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = MovieController