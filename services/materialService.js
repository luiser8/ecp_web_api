import mongoose from 'mongoose';
import '../config/database.js';
import Material from '../models/material.js';
import Supplier from '../models/supplier.js';
import Unit from '../models/unit.js';

export const getMaterialsAll = async() => {
    try{
        const materials = await Material.find({})
            .populate({path: "supplier", model: Supplier})
            .populate({path: "unit", model: Unit});
        return materials;
    }catch(error){
        return error;
    }
};

export const getMaterialById = async(id) => {
    try{
        const material = await Material.findById({_id: id})
            .populate({path: "supplier", model: Supplier})
            .populate({path: "unit", model: Unit});
        return material;
    }catch(error){
        return error;
    }
};

export const postMaterial = async(req) => {
    try{
        const { unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, status } = req.body;

        if (await Material.exists({code})) {
            return `The code ${code} is not repit`;
        }
        if (!['in stock', 'on order'].includes(status)) {
            throw Error("Status enum value invalid");
        }

        const material = await Material.create({unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, status});

        return await material.save();
        
    }catch(error){
        return error;
    }
};

export const putMaterial = async(req) => {
    try{
        const { id } = req.params;
        const { unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await Material.exists({code})) {
            return `The code ${code} is not repit`;
        }
        if (!['in stock', 'on order'].includes(status)) {
            return `Status enum value invalid`;
        }

        const newMaterial = { unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, status, _id: id };
        await Material.findByIdAndUpdate(id, newMaterial, { new: true });

        return newMaterial;

    }catch(error){
        return error;
    }
};

export const delMaterial = async(id) => {
    try{
        const material = await Material.findByIdAndDelete({_id: id});
        return material;
    }catch(error){
        return error;
    }
};