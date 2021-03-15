const router = require('express').Router()
const MovieController = require('../controllers')

router.get('/', MovieController.findMovies)
router.get('/:id', MovieController.findOneMovies)
router.post('/', MovieController.createMovie)
router.put('/:id', MovieController.updateMovie)
router.delete('/:id', MovieController.deleteMovie)

module.exports = router