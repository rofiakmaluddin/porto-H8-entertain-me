const TvSeries = require("../models");

class TvSeriesController{
  static async findTvSeries(req, res, next) {
    try {
      const tvSeries = await TvSeries.find()
      res.json(tvSeries)
    } catch (error) {
      next(error)
    }
  }
  static async findOneTvSeries(req, res, next) {
    const id = req.params.id
    try {
      const tvSeries = await TvSeries.findOne(id)
      res.json(tvSeries)
    } catch (error) {
      next(error)
    }
  }
  static async createTvSeries (req,res,next) {
    try {
      const tvSeries = await TvSeries.create(req.body)
      res.json(tvSeries)
    } catch (error) {
      next(error)
    }
  }
  static async updateTvSeries (req,res,next) {
    const id = req.params.id
    const { title, overview, post_path, popularity, tags } = req.body
    try {
      const tvSeries = await TvSeries.update(id, { title, overview, post_path, popularity, tags })
      res.json(tvSeries)
    } catch (error) {
      next(error)
    }
  }
  static async deleteTvSeries (req,res,next) {
    const id = req.params.id
    try {
      const tvSeries = await TvSeries.destroy(id)
      res.json(tvSeries)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TvSeriesController