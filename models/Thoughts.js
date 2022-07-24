const { Schema, model, Types } = require('mongoose')
const dateFormat = require('../utils/dateFormat')

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
        required: true
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
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
},
{
    toJSON:{
        getters: true
    },
    id: false
})

const ThoughtsSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 280
    },
    username: {
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
},
{
    toJSON:{
        getters: true
    },
    id: false
})

ThoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
})

//creates thought model 
const Thoughts = model('Thoughts', ThoughtsSchema)

module.exports = Thoughts