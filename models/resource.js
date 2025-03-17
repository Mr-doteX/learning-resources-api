import { Schema, model } from "mongoose";
import Joi from 'joi'

// resources schema
const resourceSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, required: true, enum: ['couser', 'book', 'tutorial'] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    image:{type:String}
}, { timestamps: true });

// resourceSchema.plugin(normalize)

export default model('Resource', resourceSchema)
// model.exports = mongoose.model('Resource', resourceSchema);