import mongoose from 'mongoose';

const unitSchema = mongoose.Schema({
    code: {type: String, unique: true, required: true},
    name: {type: String, required: true, max: 155},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const Unit = mongoose.model('Unit', unitSchema);

export default Unit;