const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
})

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        trim: true,
    },
    createdBy: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    reactions: [ReactionSchema]
})

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.reduce((total, reaction) => total + reaction.length + 1, 0);
})

//creates thought model 
const Thoughts = model('Thoughts', ThoughtsSchema)

module.exports = Thoughts