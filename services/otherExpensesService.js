import mongoose from 'mongoose';
import '../config/database.js';
import OtherExpenses from '../models/other_expenses.js';

export const getOtherExpensesAll = async() => {
    try{
        return await OtherExpenses.find();
    }catch(error){
        return error;
    }
};

export const getOtherExpensesById = async(id) => {
    try{
        return await OtherExpenses.findById({_id: id});
    }catch(error){
        return error;
    }
};

export const postOtherExpenses = async(req) => {
    try{
        const { unit, name, description } = req.body;

        if (await OtherExpenses.exists({name})) {
            return `The identifier ${name} is not repit`;
        }
        
        const otherExpenses = await OtherExpenses.create({unit, name, description});

        return await otherExpenses.save();
        
    }catch(error){
        return error;
    }
};

export const putOtherExpenses = async(req) => {
    try{
        const { id } = req.params;
        const { unit, name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await OtherExpenses.exists({name})) {
            return `The identifier ${name} is not repit`;
        }

        const newOtherExpenses = { unit, name, description, _id: id };

        return await OtherExpenses.findByIdAndUpdate(id, newOtherExpenses, { new: true });

    }catch(error){
        return error;
    }
};

export const delOtherExpenses = async(id) => {
    try{
        return await OtherExpenses.findByIdAndDelete({_id: id});
    }catch(error){
        return error;
    }
};