const router = require('express').Router()
const movieRouter = require('./movieRouter')
const tvSeriesRouter = require('./tvSeriesRouter')

router.use('/movies', movieRouter)
router.use('/tvSeries', tvSeriesRouter)

module.exports = router