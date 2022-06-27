import mongoose from 'mongoose';
import '../config/database.js';
import { qrCodeHelper } from '../helpers/qrCodeHelper.js';
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

export const getMaterialSingleById = async(id) => {
    try{
        const material = await Material.findById({_id: id});
        return material;
    }catch(error){
        return error;
    }
};

export const postMaterial = async(req) => {
    try{
        const { category, unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, expiration_date, status } = req.body;

        if (await Material.exists({code})) {
            return `The code ${code} is not repit`;
        }
        if (!['in stock', 'on order', 'exhausted'].includes(status)) {
            throw Error("Status enum value invalid");
        }

        const material = await Material.create({category, unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, expiration_date, status});

        return await material.save();
        
    }catch(error){
        return error;
    }
};

export const putMaterial = async(req) => {
    try{
        const { id } = req.params;
        const { category, unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, expiration_date, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await Material.exists({code})) {
            return `The code ${code} is not repit`;
        }
        if (!['in stock', 'on order', 'exhausted'].includes(status)) {
            return `Status enum value invalid`;
        }

        const newMaterial = { category, unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, expiration_date, status, _id: id };
        const material = await Material.findByIdAndUpdate(id, newMaterial, { new: true });

        return material;

    }catch(error){
        return error;
    }
};

export const putMaterialCurrentQty = async(req) => {
    try{
        const materials  = req;
        materials.map((_, item) => {
            if (!mongoose.Types.ObjectId.isValid(materials[item].material)) {
                return `The id ${materials[item].material} is not valid`;
            }
            getMaterialSingleById(materials[item].material).then(material => {
                materials[item].calculations.forEach(cal => {
                    let newCurrentAmount = material.current_amount - cal.qty_x_mix;

                    Material.findByIdAndUpdate({ _id: material._id },  { current_amount: newCurrentAmount }, { new: true }, function(error, result){
                        return result ? result : error;
                    });
                });
            });
        });
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