import mongoose from 'mongoose';
import '../config/database.js';
import PackingKit from '../models/packing_kit.js';
import Supplier from '../models/supplier.js';
import Unit from '../models/unit.js';

export const getPackingKitsSimpleAll = async () => {
    try {
        return await PackingKit.find({})
            .populate({ path: "unit", model: Unit, select: "code" });
    } catch (error) {
        return error;
    }
};

export const getPackingKitAll = async () => {
    try {
        return await PackingKit.find({})
            .populate({ path: "supplier", model: Supplier })
            .populate({ path: "unit", model: Unit });
    } catch (error) {
        return error;
    }
};

export const getPackingKitById = async (id) => {
    try {
        return await PackingKit.findById({ _id: id })
            .populate({ path: "supplier", model: Supplier, select: "name" })
            .populate({ path: "unit", model: Unit, select: "code name" });
    } catch (error) {
        return error;
    }
};

export const getPackingKitsExists = async (type, value) => {
    try {
        if(type === "code"){
            const packingKit = await PackingKit.exists({ code: value });
            return true ? packingKit != null : false;
        }
        if(type === "name"){
            const packingKit = await PackingKit.exists({ name: value });
            return true ? packingKit != null : false;
        }
    } catch (error) {
        return error;
    }
};

export const getPackingKitsSingleById = async (id) => {
    try {
        return await PackingKit.findById({ _id: id });
    } catch (error) {
        return error;
    }
};

export const postPackingKit = async (req) => {
    try {
        const { unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, status } = req.body;

        if (await PackingKit.exists({ code })) {
            return `The code ${code} no repeat`;
        }
        if (await PackingKit.exists({ name })) {
            return `The identifier ${name} no repeat`;
        }

        const packingKit = await PackingKit.create({ unit, supplier, code, name, description, entered_amount, current_amount, purchase_price, status });

        return await packingKit.save();

    } catch (error) {
        return error;
    }
};

export const putPackingKit = async (req) => {
    try {
        const { id } = req.params;
        const { unit, supplier, code, name, description, entered_amount, purchase_price, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }

        let new_current_amount = 0;
        let new_entered_amount = 0;
        const packing_kitSingle = await getPackingKitsSingleById(id);
        if(entered_amount !== packing_kitSingle.entered_amount){
            new_current_amount = entered_amount + packing_kitSingle.current_amount;
            new_entered_amount = entered_amount + packing_kitSingle.entered_amount;
        }else{
            new_current_amount = packing_kitSingle.current_amount;
            new_entered_amount = packing_kitSingle.entered_amount;
        }

        if (!['in stock', 'on order'].includes(status)) {
            return `Status enum value invalid`;
        }

        const newPackingKit = { unit, supplier, code, name, description, entered_amount: new_entered_amount, current_amount: new_current_amount, purchase_price, status, _id: id };

        return await PackingKit.findByIdAndUpdate(id, newPackingKit, { new: true });

    } catch (error) {
        return error;
    }
};

export const putPackingKitDownCurrentQty = async (req) => {
    try {
        const packing_kits = req;
        packing_kits.map((_, item) => {
            if (!mongoose.Types.ObjectId.isValid(packing_kits[item].packing_kit)) {
                return `The id ${packing_kits[item].packing_kit} is not valid`;
            }
            getPackingKitById(packing_kits[item].packing_kit).then(pk => {
                const cal = packing_kits[item];
                const newCurrentAmount = pk.current_amount - cal.qty_x_box;

                PackingKit.findByIdAndUpdate({ _id: pk._id },
                    { current_amount: newCurrentAmount, in_use: true },
                    { new: true },
                        (error, result) => result ? result : error);
            });
        });
    } catch (error) {
        return error;
    }
};

export const putPackingKitUpCurrentQty = async (req) => {
    try {
        const packing_kits = req;
        packing_kits.map((_, item) => {
            if (!mongoose.Types.ObjectId.isValid(packing_kits[item].packing_kit)) {
                return `The id ${packing_kits[item].packing_kit} is not valid`;
            }
            getPackingKitById(packing_kits[item].packing_kit).then(pk => {
                const cal = packing_kits[item];
                const newCurrentAmount = pk.current_amount + cal.qty_x_box;

                PackingKit.findByIdAndUpdate({ _id: pk._id },
                    { current_amount: newCurrentAmount, in_use: false },
                    { new: true },
                        (error, result) => result ? result : error);
            });
        });
    } catch (error) {
        return error;
    }
};

export const delPackingKit = async (id) => {
    try {
        return await PackingKit.findByIdAndDelete({ _id: id });
    } catch (error) {
        return error;
    }
};