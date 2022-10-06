import mongoose from 'mongoose';
import '../config/database.js';
import Category from '../models/category.js';

export const getCategorySimpleAll = async () => {
    try {
        return await Category.find({}).select('name');
    } catch (error) {
        return error;
    }
};

export const getCategoryAll = async() => {
    try{
        return await Category.find();
    }catch(error){
        return error;
    }
};

export const getCategoryById = async(id) => {
    try{
        return await Category.findById({_id: id});
    }catch(error){
        return error;
    }
};

export const getCategoryByDad = async(dad) => {
    try{
        return await Category.find({ dad }).select('name');
    }catch(error){
        return error;
    }
};

export const getCategoryExists = async (type, value) => {
    try {
        if (type === "name") {
            const category = await Category.exists({ name: value });
            return true ? category != null : false;
        }
    } catch (error) {
        return error;
    }
};

export const postCategory = async(req) => {
    try{
        const { name, description, dad } = req.body;

        if (await Category.exists({name})) {
            return `The identifier ${name} is not repit`;
        }

        const category = await Category.create({name, description, dad});

        return await category.save();

    }catch(error){
        return error;
    }
};

export const putCategory = async(req) => {
    try{
        const { id } = req.params;
        const { name, description, dad, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }

        const newCategory = { name, description, dad, status, _id: id };

        return await Category.findByIdAndUpdate(id, newCategory, { new: true });

    }catch(error){
        return error;
    }
};

export const delCategory = async(id) => {
    try{
        return await Category.findByIdAndDelete({_id: id});
    }catch(error){
        return error;
    }
};