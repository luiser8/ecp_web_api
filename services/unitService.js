import mongoose from 'mongoose';
import '../config/database.js';
import Unit from '../models/unit.js';

export const getUnitSimpleAll = async () => {
    try {
        return await Unit.find({}).select('name');
    } catch (error) {
        return error;
    }
};

export const getUnitAll = async() => {
    try{
        return await Unit.find();
    }catch(error){
        return error;
    }
};

export const getUnitById = async(id) => {
    try{
        return await Unit.findById({_id: id});
    }catch(error){
        return error;
    }
};

export const postUnit = async(req) => {
    try{
        const { code, name } = req.body;

        if (await Unit.exists({code})) {
            return `The code ${code} is not repit`;
        }

        const unit = await Unit.create({code, name});

        unit.code = code.toUpperCase();

        return await unit.save();

    }catch(error){
        return error;
    }
};

export const putUnit = async(req) => {
    try{
        const { id } = req.params;
        const { code, name } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await Unit.exists({code})) {
            return `The code ${code} is not repit`;
        }

        const newUnit = { code, name, _id: id };

        return await Unit.findByIdAndUpdate(id, newUnit, { new: true });

    }catch(error){
        return error;
    }
};

export const delUnit = async(id) => {
    try{
        return await Unit.findByIdAndDelete({_id: id});
    }catch(error){
        return error;
    }
};