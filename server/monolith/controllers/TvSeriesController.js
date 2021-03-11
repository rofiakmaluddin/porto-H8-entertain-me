const TvSeries = require("../models/TvSeries");

class TvSeriesController{
  static async findTvSeries(req, res, next) {
    try {
      const tvSeries = await TvSeries.find()
      res.json(tvSeries)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = TvSeriesController