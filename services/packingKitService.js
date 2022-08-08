import mongoose from 'mongoose';
import '../config/database.js';
import PackingKit from '../models/packing_kit.js';

export const getPackingKitAll = async () => {
    try {
        return await PackingKit.find();
    } catch (error) {
        return error;
    }
};

export const getPackingKitById = async (id) => {
    try {
        return await PackingKit.findById({ _id: id });
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

export const postPackingKit = async (req) => {
    try {
        const { unit, code, name, description, entered_amount, current_amount, purchase_price } = req.body;

        if (await PackingKit.exists({ code })) {
            return `The code ${code} no repeat`;
        }
        if (await PackingKit.exists({ name })) {
            return `The identifier ${name} no repeat`;
        }

        const packingKit = await PackingKit.create({ unit, code, name, description, entered_amount, current_amount, purchase_price });

        return await packingKit.save();

    } catch (error) {
        return error;
    }
};

export const putPackingKit = async (req) => {
    try {
        const { id } = req.params;
        const { unit, code, name, description, entered_amount, current_amount, purchase_price } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await PackingKit.exists({ code })) {
            return `The code ${code} no repeat`;
        }
        if (await PackingKit.exists({ name })) {
            return `The identifier ${name} no repeat`;
        }

        const newPackingKit = { unit, code, name, description, entered_amount, current_amount, purchase_price, _id: id };

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
                    { current_amount: newCurrentAmount },
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
                    { current_amount: newCurrentAmount },
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