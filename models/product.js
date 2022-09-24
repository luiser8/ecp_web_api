import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    code: { type: String, unique: true, required: true },
    category: {type: mongoose.Schema.Types.ObjectId, ref: "Category", require: true},
    unit: {type: mongoose.Schema.Types.ObjectId, ref: "Unit", require: true},
    qr_code: { type: String, required: false },
    name: { type: String, required: true, max: 155 },
    description: { type: String, required: true, max: 155 },
    presentation: { type: String, required: true, max: 255 },
    image: { type: String, required: false },
    boxes_x_mix: { type: Number, required: true, set(v) { return v.toFixed(2); }, },
    units_x_mix: { type: Number, required: true },
    margin_of_gain: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
    pvp_x_boxes: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
    pvp_x_units: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
    materials: [
        {
            material: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Material",
                require: false
            },
            qty_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            cost_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            cost_unit_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            qty_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            cost_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            qty_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); } },
            cost_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); } },
        }
    ],
    packing_kits: [
        {
            packing_kit: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "PackingKit",
                require: false
            },
            qty_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            cost_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            cost_unit_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            qty_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            cost_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            qty_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); } },
            cost_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); } },
        }
    ],
    others_expenses: [
        {
            other_expenses: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "OtherExpenses",
                require: false
            },
            total_cost_demanded: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            cost_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            cost_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); } },
        }
    ],
    total_x_materials: [
        {
            total_qty_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_cost_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_cost_unit_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_qty_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_cost_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_qty_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); }, },
            total_cost_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); }, },
        }
    ],
    total_x_packing_kits: [
        {
            total_cost_unit_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_qty_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_cost_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_qty_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); }, },
            total_cost_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); }, },
        }
    ],
    total_x_materials_packing_kits: [
        {
            total_cost_unit_x_mix: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_qty_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_cost_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); }, },
            total_qty_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); }, },
            total_cost_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); }, },
        }
    ],
    total_x_others_expenses: [
        {
            total_cost_demanded: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            total_cost_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            total_cost_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); } },
        }
    ],
    total_x_materials_packing_kits_others_expenses: [
        {
            total_cost_demanded: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            total_cost_x_box: { type: Number, required: false, set(v) { return v.toFixed(2); } },
            total_cost_x_unit: { type: Number, required: false, set(v) { return v.toFixed(4); } },
        }
    ],
    status: { type: String, required: true, enum: ['in process', 'finished'] }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;