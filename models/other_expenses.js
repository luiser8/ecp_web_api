import mongoose from 'mongoose';

const other_expensesSchema = mongoose.Schema({
    unit: {type: mongoose.Schema.Types.ObjectId, ref: "Unit", require: true},
    name: {type: String, required: true, max: 155},
    description: {type: String, required: true, max: 155},
    status: {type: Boolean, required: true, default: true}
},{timestamps:true});

const Other_expenses = mongoose.model('Other_expenses', other_expensesSchema);

export default Other_expenses;