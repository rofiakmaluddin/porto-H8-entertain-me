const TvSeriesController = require('../controllers')

const router = require('express').Router()

router.get('/', TvSeriesController.findTvSeries)
router.get('/:id', TvSeriesController.findOneTvSeries)
router.post('/', TvSeriesController.createTvSeries)
router.put('/:id', TvSeriesController.updateTvSeries)
router.delete('/:id', TvSeriesController.deleteTvSeries)

module.exports = router