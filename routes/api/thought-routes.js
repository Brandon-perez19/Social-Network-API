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

//api/thoughts/
router
.route('/')
.get(getAllThoughts)


// api/thoughts/:id
router
.route('/:thoughtsId')
.get(getThoughtById)
.put(updateThought)

//creates a thought based on user id
// api/thoughts/user/:id
router
.route('/user/:userId')
.post(createThought)

//deletes a thought and updates user model
router
.route('/user/:userId/:thoughtsId')
.delete(deleteThoughts)
//creates a reaction based on thoughts id
// api/thoughts/:id/reactions
router
.route('/:thoughtsId/reactions')
.post(addReaction)

//removes a reaction based on thoughts id and reaction id
// api/thoughts/:id/:id
router
.route('/:thoughtsId/:reactionId')
.delete(removeReaction)

module.exports = router


