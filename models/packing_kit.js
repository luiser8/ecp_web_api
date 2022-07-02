import mongoose from 'mongoose';

const packingKitSchema = mongoose.Schema({
    unit: {type: mongoose.Schema.Types.ObjectId, ref: "Unit", require: true},
    name: {type: String, required: true, max: 155},
    description: {type: String, required: true, max: 155},
    entered_amount: {type: Number, required: true},
    current_amount: {type: Number, required: false},
    purchase_price: {type: Number, required: false, set(v) { return v.toFixed(2); }},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const PackingKit = mongoose.model('PackingKit', packingKitSchema);

export default PackingKit;