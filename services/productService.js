import mongoose from 'mongoose';
import '../config/database.js';
import Material from '../models/material.js';
import Product from '../models/product.js';
import Unit from '../models/unit.js';
import { calculations } from '../middleware/calculations.js';
import { checkNotRepitMaterial } from '../helpers/checkHelper.js';
import { qrCodeHelper } from '../helpers/qrCodeHelper.js';

export const getProductsAll = async () => {
    try {
        const products = await Product.find({})
            .populate({
                path: "materials", populate: [
                    {
                        path: "material", model: Material, select: "code name",
                        populate: { path: "unit", model: Unit, select: "code" }
                    }
                ]
            });
        return products;
    } catch (error) {
        return error;
    }
};

export const getProductById = async (id) => {
    try {
        const product = await Product.findById({ _id: id })
            .populate({
                path: "materials", populate: [
                    {
                        path: "material", model: Material, select: "code name",
                        populate: { path: "unit", model: Unit, select: "code" }
                    }
                ]
            });
        return product;
    } catch (error) {
        return error;
    }
};

export const postProduct = async (req) => {
    try {
        const { code, name, description, presentation, boxes_x_mix, units_x_mix, materials, status } = req.body;

        const {
            materialscalc,
            total_qty_x_mix,
            total_cost_x_mix,
            total_cost_unit_x_mix,
            total_qty_x_box,
            total_cost_x_box,
            total_qty_x_unit,
            total_cost_x_unit,
        } = calculations(
            {
                boxes_x_mix,
                units_x_mix,
                materials,
            }
        );

        if (await Product.exists({ code })) {
            return `The code ${code} is not repit`;
        }
        if (!['in process', 'finished', 'slow'].includes(status)) {
            return `Status enum value invalid`;
        }

        const qr_code = await qrCodeHelper(code);

        const product = await Product.create(
            {
                code,
                qr_code,
                name,
                description,
                presentation,
                boxes_x_mix,
                units_x_mix,
                materials: materialscalc,
                total_qty_x_mix,
                total_cost_x_mix,
                total_cost_unit_x_mix,
                total_qty_x_box,
                total_cost_x_box,
                total_qty_x_unit,
                total_cost_x_unit,
                status
            }
        );

        return await product.save();

    } catch (error) {
        return error;
    }
};

export const putProduct = async (req) => {
    try {
        const { id } = req.params;
        const { code, name, description, presentation, boxes_x_mix, units_x_mix, materials, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await Product.exists({ code })) {
            return `The code ${code} is not repit`;
        }
        if (!['in process', 'finished', 'slow'].includes(status)) {
            return `Status enum value invalid`;
        }

        let materialsOld = [];

        await getProductById(id).then(item => {
            item.materials.forEach(async element => {
                const checkNotRepit = await checkNotRepitMaterial({
                    'materialId': element.material._id.toString(),
                    'materials': materials
                });

                if (checkNotRepit.error === true) {
                    console.log('Hay materiales repetidos');
                }

                element.calculations.forEach(async cal => {
                    materialsOld.push(
                        {
                            "material": element.material._id.toString(),
                            "calculations": [
                                {
                                    "qty_x_mix": cal.qty_x_mix,
                                    "cost_x_mix": cal.cost_x_mix
                                }
                            ]
                        }
                    );
                });
            });
        });

        const newsMaterials = [...materialsOld, ...materials];

        const {
            materialscalc,
            total_qty_x_mix,
            total_cost_x_mix,
            total_cost_unit_x_mix,
            total_qty_x_box,
            total_cost_x_box,
            total_qty_x_unit,
            total_cost_x_unit,
        } = calculations(
            {
                boxes_x_mix,
                units_x_mix,
                materials: newsMaterials,
            }
        );

        const newProduct =
        {
            code,
            name,
            description,
            presentation,
            boxes_x_mix,
            units_x_mix,
            materials: materialscalc,
            total_qty_x_mix,
            total_cost_x_mix,
            total_cost_unit_x_mix,
            total_qty_x_box,
            total_cost_x_box,
            total_qty_x_unit,
            total_cost_x_unit,
            status,
            _id: id
        };

        const product = await Product.findByIdAndUpdate(id, newProduct, { new: true });

        return product;

    } catch (error) {
        return error;
    }
};

export const delProduct = async (id) => {
    try {
        const product = await Product.findByIdAndDelete({ _id: id });
        return product;
    } catch (error) {
        return error;
    }
};