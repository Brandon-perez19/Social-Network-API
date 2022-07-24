const { User, Thoughts } = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v', 
            })
            .populate({
                path: 'thoughts',
                select: '-__v',
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            });
    },

    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                //if no user id found, send 404
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            });
    },

    //create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    //updates user by id
    updateUser ({params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with this id!'});
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err))
    },

    deleteUser({params}, res){
        User.findOneAndDelete({_id:params.id})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({message: 'No user found with this id!'});
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            })
    },

    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { _id: params.userId },
            { $push: { friends: params.friendId } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No users found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },

    removeFriend({ params }, res) {
        console.log(params)
        User.findOneAndUpdate(
            { _id: params.userId },
            { $pull: { friends: params.friendId} },
            { new: true}
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No users found with this id!' });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    },
}

module.exports = userController;