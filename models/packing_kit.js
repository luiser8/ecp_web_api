import mongoose from 'mongoose';

const packingKitSchema = mongoose.Schema({
    unit: {type: mongoose.Schema.Types.ObjectId, ref: "Unit", require: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", require: true},
    supplier: {type: mongoose.Schema.Types.ObjectId, ref: "Supplier", require: false},
    code: {type: String, unique: true, required: true},
    name: {type: String, required: true, max: 155},
    description: {type: String, required: true, max: 155},
    entered_amount: {type: Number, required: true},
    current_amount: {type: Number, required: false},
    purchase_price: {type: Number, required: false, set(v) { return v.toFixed(2); }},
    in_use: {type: Boolean, required: false, default: false},
    status: {type: String, required: false, enum: ['in stock', 'on order']}
},{timestamps:true});

const PackingKit = mongoose.model('PackingKit', packingKitSchema);

export default PackingKit;