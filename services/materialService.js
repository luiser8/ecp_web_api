import mongoose from 'mongoose';
import '../config/database.js';
import Material from '../models/material.js';
import Category from '../models/category.js';
import Supplier from '../models/supplier.js';
import Unit from '../models/unit.js';

export const getMaterialsSimpleAll = async () => {
    try {
        return await Material.find({});
    } catch (error) {
        return error;
    }
};

export const getMaterialsAll = async () => {
    try {
        return await Material.find({})
            .populate({ path: "supplier", model: Supplier })
            .populate({ path: "unit", model: Unit });
    } catch (error) {
        return error;
    }
};

export const getMaterialById = async (id) => {
    try {
        return await Material.findById({ _id: id })
            .populate({ path: "category", model: Category, select: "name" })
            .populate({ path: "supplier", model: Supplier, select: "name" })
            .populate({ path: "unit", model: Unit, select: "code name" });
    } catch (error) {
        return error;
    }
};

export const getMaterialsExists = async (type, value) => {
    try {
        if(type === "code"){
            const material = await Material.exists({ code: value });
            return true ? material != null : false;
        }
        if(type === "name"){
            const material = await Material.exists({ name: value });
            return true ? material != null : false;
        }
    } catch (error) {
        return error;
    }
};

export const getMaterialSingleById = async (id) => {
    try {
        return await Material.findById({ _id: id });
    } catch (error) {
        return error;
    }
};

export const postMaterial = async (req) => {
    try {
        const { category, unit, supplier, code, name, description, entered_amount, purchase_price, expiration_date, status } = req.body;

        if (await Material.exists({ code })) {
            return `The code ${code} no repeat`;
        }
        if (await Material.exists({ name })) {
            return `The code ${name} no repeat`;
        }

        const current_amount = entered_amount;

        const material = await Material.create({ category, unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, expiration_date, status });

        return await material.save();

    } catch (error) {
        return error;
    }
};

export const putMaterial = async (req) => {
    try {
        const { id } = req.params;
        const { category, unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, expiration_date, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }

        let new_current_amount = 0;
        let new_entered_amount = 0;
        const materialSingle = await getMaterialSingleById(id);
        if(entered_amount !== materialSingle.entered_amount){
            new_current_amount = entered_amount + materialSingle.current_amount;
            new_entered_amount = entered_amount + materialSingle.entered_amount;
        }else{
            new_current_amount = materialSingle.current_amount;
            new_entered_amount = materialSingle.entered_amount;
        }

        if (!['in stock', 'on order', 'exhausted'].includes(status)) {
            return `Status enum value invalid`;
        }

        const newMaterial = { category, unit, supplier, code, name, description, entered_amount: new_entered_amount, current_amount: new_current_amount, purchase_price, expiration_date, status, _id: id };

        return await Material.findByIdAndUpdate(id, newMaterial, { new: true });

    } catch (error) {
        return error;
    }
};

export const putMaterialDownCurrentQty = async (req) => {
    try {
        const materials = req;
        materials.map((_, item) => {
            if (!mongoose.Types.ObjectId.isValid(materials[item].material)) {
                return `The id ${materials[item].material} is not valid`;
            }
            getMaterialSingleById(materials[item].material).then(material => {
                const cal = materials[item];
                const newCurrentAmount = material.current_amount - cal.qty_x_mix;

                Material.findByIdAndUpdate({ _id: material._id },
                    { current_amount: newCurrentAmount },
                    { new: true },
                        (error, result) => result ? result : error);
            });
        });
    } catch (error) {
        return error;
    }
};

export const putMaterialUpCurrentQty = async (req) => {
    try {
        const materials = req;
        materials.map((_, item) => {
            if (!mongoose.Types.ObjectId.isValid(materials[item].material)) {
                return `The id ${materials[item].material} is not valid`;
            }
            getMaterialSingleById(materials[item].material).then(material => {
                const cal = materials[item];
                const newCurrentAmount = material.current_amount + cal.qty_x_mix;

                Material.findByIdAndUpdate({ _id: material._id },
                    { current_amount: newCurrentAmount },
                    { new: true },
                        (error, result) => result ? result : error);
            });
        });
    } catch (error) {
        return error;
    }
};

export const delMaterial = async (id) => {
    try {
        return await Material.findByIdAndDelete({ _id: id });
    } catch (error) {
        return error;
    }
};