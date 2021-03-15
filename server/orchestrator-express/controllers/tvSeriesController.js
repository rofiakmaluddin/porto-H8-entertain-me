const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

class TvSeriesController {
  static async findTvSeries (req, res, next) {
    try {
      const tvSeriesData = await redis.get('tvSeries:data')
      if (tvSeriesData) {
        res.status(200).json(JSON.parse(tvSeriesData))
      } else {
        axios.get('http://localhost:4002')
          .then(({ data }) => {
            redis.set("tvSeries:data", JSON.stringify(data))
            res.status(200).json(data)
          })
          .catch(err => {
            next(err)
          })
      }
    } catch (error) {
      next (error)
    }
  }
  static async findOneTvSeries (req, res, next) {
    try {
      await redis.del('tvSeries:data')
      const id = req.params.id
      axios.get(`http://localhost:4002/${id}`)
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
  static async createTvSeries (req, res, next) {
    try {
      await redis.del('tvSeries:data')
      const { title, overview, poster_path, popularity, tags } = req.body
      axios({
        method: 'POST',
        url: 'http://localhost:4002',
        data: { title, overview, poster_path, popularity, tags }
      }).then(({ data }) => {
        res.status(201).json(data)
      })
    } catch (error) {
      next(error)
    }
  }
  static async updateTvSeries (req, res, next) {
    try {
      await redis.del('tvSeries:data')
      const id = req.params.id
      const { title, overview, poster_path, popularity, tags } = req.body
      axios({
        method: 'PUT',
        url: `http://localhost:4002/${id}`,
        data: { title, overview, poster_path, popularity, tags }
      }).then(({ data }) => {
        res.status(200).json(data)
      })
    } catch (error) {
      next(error)
    }
  }
  static async deleteTvSeries (req, res, next) {
    try {
      await redis.del('tvSeries:data')
      const id = req.params.id
      axios.delete(`http://localhost:4002/${id}`)
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

module.exports = TvSeriesController
