import mongoose from 'mongoose';

const materialSchema = mongoose.Schema({
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", require: true},
    unit: {type: mongoose.Schema.Types.ObjectId, ref: "Unit", require: true},
    supplier: {type: mongoose.Schema.Types.ObjectId, ref: "Supplier", require: false},
    code: {type: String, unique: true, required: true},
    name: {type: String, required: true, max: 155},
    description: {type: String, required: true, max: 255},
    entered_amount: {type: Number, required: true},
    current_amount: {type: Number, required: false},
    purchase_price: {type: Number, required: false, set(v) { return v.toFixed(2); }},
    expiration_date: {type: Date, required: false},
    status: {type: String, required: false, enum: ['in stock', 'on order']}
},{timestamps:true});

const Material = mongoose.model('Material', materialSchema);

export default Material;