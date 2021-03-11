const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.get('/', MovieController.findMovies)
router.post('/', MovieController.createMovie)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router