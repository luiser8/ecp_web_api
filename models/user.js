import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    role: {type: mongoose.Schema.Types.ObjectId, ref: "Role", require: true},
    identifier: {type: Number, unique: true, required: true},
    firstname: {type: String, required: true, max: 155},
    lastname: {type: String, required: true, max: 155},
    email: {type: String, unique: true, required: true, max: 155},
    username: {type: String, unique: true, required: true, max: 155},
    password: {type: String, required: true, max: 155},
    accesstoken: {type: String, required: false},
    refreshtoken: {type: String, required: false},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const User = mongoose.model('User', userSchema);

export default User;