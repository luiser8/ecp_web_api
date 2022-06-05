import mongoose from 'mongoose';

const supplierSchema = mongoose.Schema({
    identifier: {type: String, unique: true, required: true},
    name: {type: String, required: true, max: 155},
    description: {type: String, required: true, max: 155},
    email: {type: String, unique: true, required: true, max: 155},
    phone: {type: String, unique: true, required: true, max: 155},
    address: {type: String, required: true, max: 155},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;