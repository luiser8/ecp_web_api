import mongoose from 'mongoose';

const otherExpensesSchema = mongoose.Schema({
    code: {type: String, unique: true, required: true},
    name: {type: String, required: true, max: 155},
    description: {type: String, required: true, max: 155},
    in_use: {type: Boolean, required: false, default: true},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const OtherExpenses = mongoose.model('OtherExpenses', otherExpensesSchema);

export default OtherExpenses;