import mongoose from 'mongoose';
import '../config/database.js';
import Category from '../models/category.js';

export const getCategoryAll = async() => {
    try{
        const category = await Category.find();
        return category;
    }catch(error){
        return error;
    }
};

export const getCategoryById = async(id) => {
    try{
        const category = await Category.findById({_id: id});
        return category;
    }catch(error){
        return error;
    }
};

export const postCategory = async(req) => {
    try{
        const { name, description } = req.body;

        if (await Category.exists({name})) {
            return `The identifier ${name} is not repit`;
        }
        
        const category = await Category.create({name, description});

        return await category.save();
        
    }catch(error){
        return error;
    }
};

export const putCategory = async(req) => {
    try{
        const { id } = req.params;
        const { name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await Category.exists({name})) {
            return `The identifier ${name} is not repit`;
        }

        const newCategory = { name, description, _id: id };
        const category = await Category.findByIdAndUpdate(id, newCategory, { new: true });

        return category;

    }catch(error){
        return error;
    }
};

export const delCategory = async(id) => {
    try{
        const category = await Category.findByIdAndDelete({_id: id});
        return category;
    }catch(error){
        return error;
    }
};