const TvSeriesController = require('../controllers/TvSeriesController')

const router = require('express').Router()

router.get('/', TvSeriesController.findTvSeries)

module.exports = router