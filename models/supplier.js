import mongoose from 'mongoose';

const supplierSchema = mongoose.Schema({
    identifier: {type: String, unique: true, required: true},
    type: {type: String, required: true, enum: ['natural', 'juridico']},
    name: {type: String, required: true, max: 155},
    description: {type: String, required: true, max: 155},
    email: {type: String, unique: true, required: true, max: 155},
    phone: {type: String, unique: true, required: true, max: 155},
    address: {type: String, required: true, max: 155},
    status: {type: Boolean, required: false, default: true}
},{timestamps:true});

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;