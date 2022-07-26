const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require ('../../controllers/user-controller.js')

//set up GET all and POST at /api/users
router
.route('/')
.get(getAllUsers)
.post(createUser);

//set up GET one, PUT and DELETE at /api/users/:_id
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser)

router
.route('/:userId/friends/:friendId')
.post(addFriend)
.delete(removeFriend)


module.exports = router