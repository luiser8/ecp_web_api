import mongoose from 'mongoose';
import '../config/database.js';
import PackingKit from '../models/packing_kit.js';

export const getPackingKitAll = async() => {
    try{
        const packingKit = await PackingKit.find();
        return packingKit;
    }catch(error){
        return error;
    }
};

export const getPackingKitById = async(id) => {
    try{
        const packingKit = await PackingKit.findById({_id: id});
        return packingKit;
    }catch(error){
        return error;
    }
};

export const postPackingKit = async(req) => {
    try{
        const { unit, name, description } = req.body;

        if (await PackingKit.exists({name})) {
            return `The identifier ${name} is not repit`;
        }
        
        const packingKit = await PackingKit.create({unit, name, description});

        return await packingKit.save();
        
    }catch(error){
        return error;
    }
};

export const putPackingKit = async(req) => {
    try{
        const { id } = req.params;
        const { unit, name, description } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await PackingKit.exists({name})) {
            return `The identifier ${name} is not repit`;
        }

        const newPackingKit = { unit, name, description, _id: id };
        const packingKit = await PackingKit.findByIdAndUpdate(id, newPackingKit, { new: true });

        return packingKit;

    }catch(error){
        return error;
    }
};

export const delPackingKit = async(id) => {
    try{
        const packingKit = await PackingKit.findByIdAndDelete({_id: id});
        return packingKit;
    }catch(error){
        return error;
    }
};