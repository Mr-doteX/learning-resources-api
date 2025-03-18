import { Schema, model } from "mongoose";

// resources schema
const resourceSchema = new Schema({
    title: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, required: true, enum: ['couse', 'book', 'tutorial'] },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    pictures:[{type:String}]
}, { timestamps: true });

// resourceSchema.plugin(normalize)

export default model('Resource', resourceSchema)
// model.exports = mongoose.model('Resource', resourceSchema);