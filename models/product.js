import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    code: {type: String, unique: true, required: false},
    name: {type: String, required: false, max: 155},
    description: {type: String, required: false, max: 155},
    presentation: {type: String, required: false, max: 255},
    boxes_x_mix: {type: Number, required: false, set(v) { return v.toFixed(2); }},
    units_x_mix: {type: Number, required: true},
    materials: [
        {
            material: {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Material", 
                require: false
            },
            calculations: [
                {
                    qty_x_mix: {type: Number, required: false, set(v) { return v.toFixed(2); }},
                    cost_x_mix: {type: Number, required: false, set(v) { return v.toFixed(2); }},
                    cost_unit_x_mix: {type: Number, required: false, set(v) { return v.toFixed(2); }},
                    qty_x_box: {type: Number, required: false, set(v) { return v.toFixed(2); }},
                    cost_x_box: {type: Number, required: false, set(v) { return v.toFixed(4); }},
                    qty_x_unit: {type: Number, required: false, set(v) { return v.toFixed(2); }},
                    cost_x_unit: {type: Number, required: false, set(v) { return v.toFixed(2); }},
                }
            ]
        }
    ],
    total_qty_x_mix : {type: Number, required: false, set(v) { return v.toFixed(2); },},
    total_cost_x_mix : {type: Number, required: false, set(v) { return v.toFixed(2); },},
    total_cost_unit_x_mix : {type: Number, required: false, set(v) { return v.toFixed(2); },},
    total_qty_x_box : {type: Number, required: false, set(v) { return v.toFixed(2); },},
    total_cost_x_box : {type: Number, required: false, set(v) { return v.toFixed(2); },},
    total_qty_x_unit : {type: Number, required: false, set(v) { return v.toFixed(2); },},
    total_cost_x_unit : {type: Number, required: false, set(v) { return v.toFixed(2); },},
    status: {type: String, required: true, enum: ['in process', 'finished', 'slow']}
},{timestamps:true});

const Product = mongoose.model('Product', productSchema);

export default Product;