const {Schema, model,} = require('mongoose')

const UserSchema = new Schema ({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    friends:[
        {
            type:Schema.Types.ObjectId,
            //tell the user model which document to search for
            ref: 'User'
        }
    ],
    thoughts:[{
        type: Schema.Types.ObjectId,
        //tells the user model which document to search for the information
        ref: 'Thoughts'
    }]
},
{
    toJSON:{
        virtuals: true,
    },

    id: false
})

UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

//create the user model
const User = model('User', UserSchema)

module.exports= User;