const { Thoughts } = require('../models');

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
    getThoughtById(req, res) {
        Thoughts.findOne({ params })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtsData => {
                //if not thoughts found by id
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found with this id!' });
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
    createThought({ body }, res) {
        Thoughts.create(body)
            .then(dbThoughtsData => res.json(dbThoughtsData))
            .catch(err => res.status(400).json(err))
    },

    //updates thought by id
    updateThought({ params, body }, res) {
        Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.status(400).json(err))
    },

    //deletes thought by id
    deleteThoughts({ params }, res) {
        Thoughts.findOneAndDelete({ _id: params.id })
            .then(dbThoughtsData => {
                if (!dbThoughtsData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                }
                res.json(dbThoughtsData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
    },

    //add a reaction to a thought
    addReaction({ params, body }, res) {
        Thoughts.create(body)
            .then(({ _id }) => {
                return Thoughts.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reactions: _id } },
                    { new: true, runValidators: true }
                );
            })
            .then(dbThoughtsData => {
                if(!dbThoughtsData) {
                    res.status(404).json({ message: 'No thoughts found with this id!'});
                    return;
                }
                res.json(dbThoughtsData);
            })
            .catch(err => res.json(err));
    },

    //remove a reaction to a thought 
    removeReaction({params}, res) {
        Thoughts.findOneAndDelete(
            {_id: params.reactionId},
            {$pull: {reactions: params}},
            {new: true}
        )
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => res.json(err))
    },
};

module.exports = thoughtsController;