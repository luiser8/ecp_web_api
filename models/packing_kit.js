import mongoose from 'mongoose';

const packing_kitSchema = mongoose.Schema({
    unit: {type: mongoose.Schema.Types.ObjectId, ref: "Unit", require: true},
    name: {type: String, required: true, max: 155},
    description: {type: String, required: true, max: 155},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const Packing_kit = mongoose.model('Packing_kit', packing_kitSchema);

export default Packing_kit;