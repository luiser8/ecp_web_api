import mongoose from 'mongoose';
import '../config/database.js';
import OtherExpenses from '../models/other_expenses.js';
import Product from '../models/product.js';

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

export const getOtherExpensesExists = async (type, value) => {
    try {
        if(type === "name"){
            const otherExpenses = await OtherExpenses.exists({ name: value });
            return true ? otherExpenses != null : false;
        }
    } catch (error) {
        return error;
    }
};

export const getOtherExpensesByProducts = async (other) => {
    try {
        return await Product
            .find({ 'others_expenses.other_expenses': other.toString() })
            .select('code name presentation status createdAt');
    } catch (error) {
        return error;
    }
};

export const postOtherExpenses = async(req) => {
    try{
        const { name, description } = req.body;

        if (await OtherExpenses.exists({name})) {
            return `The identifier ${name} is not repit`;
        }

        const otherExpenses = await OtherExpenses.create({name, description});

        return await otherExpenses.save();

    }catch(error){
        return error;
    }
};

export const putOtherExpenses = async(req) => {
    try{
        const { id } = req.params;
        const { name, description, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }

        const newOtherExpenses = { name, description, status, _id: id };

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