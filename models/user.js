import {Schema, model} from "mongoose";
import bcrypt from "bcryptjs";
import normalize from "normalize-mongoose";

// user details schema
const userSchema = new Schema({
    name: {type: String, required: true},
    email:{type: String, required:true, unique:true},
    password:{type: String, required:true, minlength:[9, 'Input an minimum of 9 characters']},

},{timestamps:true});

// passwrod hassing 
userSchema.pre('save', async function (next) {
    if(this.isModified('password')){
        this.password =await bcrypt.hash(this.password, 9);
    } next();    
});

userSchema.plugin(normalize)

export default  model('User', userSchema);

