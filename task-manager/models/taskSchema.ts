import mongoose, { Schema, models } from "mongoose";


const schema = new Schema({
    title: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required: true
    },
    important: {
        type: Boolean,
        default: false
    },
    complete : {
        type: Boolean,
        default: false
    },
    dateTime: {
        type: String,
        required: true
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{timestamps: true})

const Task = models.Task || mongoose.model('Task', schema)

export default Task