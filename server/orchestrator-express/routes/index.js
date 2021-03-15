const router = require('express').Router()
const axios = require('axios')
const movieRouter = require('./movieRouter')
const tvSeriesRouter = require('./tvSeriesRouter')
const Redis = require("ioredis");
const redis = new Redis();

router.use('/movies', movieRouter)
router.use('/tvSeries', tvSeriesRouter)

router.get('/', async (req, res, next) => {
  try {
    const allData = await redis.get('allData:data')
    if (allData) {
      console.log('data ADA di cache >>>>>', allData);
      res.status(200).json(JSON.parse(allData))
    } else {
      const allData = {}
      const tempMovies = await axios.get('http://localhost:4001')
      const tempTvSeries = await axios.get('http://localhost:4002')
      allData.movies = tempMovies.data
      allData.tvSeries = tempTvSeries.data
      redis.set("allData:data", JSON.stringify(allData))
      console.log('data BELUM di cache >>>>>', allData);
      res.status(200).json(allData)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router