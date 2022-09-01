import mongoose from 'mongoose';
import '../config/database.js';
import Supplier from '../models/supplier.js';

export const getSuppliersSimpleAll = async () => {
    try {
        return await Supplier.find({}).select('type name');
    } catch (error) {
        return error;
    }
};

export const getSuppliersAll = async() => {
    try{
        return await Supplier.find();
    }catch(error){
        return error;
    }
};

export const getSupplierById = async(id) => {
    try{
        return await Supplier.findById({_id: id});
    }catch(error){
        return error;
    }
};

export const getSuppliersExists = async (type, value) => {
    try {
        if (type === "identifier") {
            const supplier = await Supplier.exists({ identifier: value });
            return true ? supplier != null : false;
        }
        if (type === "name") {
            const supplier = await Supplier.exists({ name: value });
            return true ? supplier != null : false;
        }
        if (type === "phone") {
            const supplier = await Supplier.exists({ phone: value });
            return true ? supplier != null : false;
        }
        if (type === "email") {
            const supplier = await Supplier.exists({ email: value });
            return true ? supplier != null : false;
        }
    } catch (error) {
        return error;
    }
};

export const postSupplier = async(req) => {
    try{
        const { identifier, type, name, description, email, phone, address } = req.body;

        if (await Supplier.exists({identifier})) {
            return `The identifier ${identifier} is not repit`;
        }
        if (await Supplier.exists({email})) {
            return `The email ${email} is not repit`;
        }
        if (await Supplier.exists({phone})) {
            return `The phone ${phone} is not repit`;
        }

        const supplier = await Supplier.create({identifier, type, name, description, email, phone, address});

        return await supplier.save();

    }catch(error){
        return error;
    }
};

export const putSupplier = async(req) => {
    try{
        const { id } = req.params;
        const { identifier, type, name, description, email, phone, address } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await Supplier.exists({identifier})) {
            return `The identifier ${identifier} is not repit`;
        }

        const newSupplier = { identifier, type, name, description, email, phone, address, _id: id };

        return await Supplier.findByIdAndUpdate(id, newSupplier, { new: true });

    }catch(error){
        return error;
    }
};

export const delSupplier = async(id) => {
    try{
        return await Supplier.findByIdAndDelete({_id: id});
    }catch(error){
        return error;
    }
};