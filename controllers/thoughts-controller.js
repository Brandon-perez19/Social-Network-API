const { User, Thoughts } = require('../models');

const thoughtsController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thoughts.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => {
                console.log(err)
                res.status(400).json(err);
            });
    },

    //get thought by id
    getThoughtById({ params }, res) {
        Thoughts.findOne({ _id: params.thoughtsId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                //if not thoughts found by id
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtsData)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json(err)
            })
    },

    //creates a new thought
    createThought({ params, body }, res) {
        console.log(body);
        Thoughts.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No users found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //updates thought by id
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.thoughtsId }, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    //deletes thought by id
    deleteThoughts({ params }, res) {
        console.log(params);
        Thoughts.findOneAndDelete({_id: params.thoughtsId})
            .then(() => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtsId } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No thoughts found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //add a reaction to a thought
    addReaction({ params, body }, res) {
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id!' });
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    //remove a reaction to a thought 
    removeReaction({ params }, res) {
        console.log(params);
        Thoughts.findOneAndUpdate(
            { _id: params.thoughtsId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => res.json(err));
    }

};

module.exports = thoughtsController;