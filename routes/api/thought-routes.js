const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThoughts,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts-controller')
const router = require('express').Router();

// /api/thoughts
router
.route('/')
.get(getAllThoughts)

router
.route('/:id')
.get(getThoughtById)
.post(createThought)
.put(updateThought)
.delete(deleteThoughts)

router
.route('/:id/reactions')
.post(addReaction)

router
.route('/:id/:reactionId')
.delete(removeReaction)

module.exports = router


