import mongoose from 'mongoose';

const roleSchema = mongoose.Schema({
    name: {type: String, required: true, max: 155},
    type: {type: Number, required: true},
    description: {type: String, required: true, max: 155},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const Role = mongoose.model('Role', roleSchema);

export default Role;