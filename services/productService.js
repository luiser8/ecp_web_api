import mongoose from 'mongoose';
import '../config/database.js';
import Material from '../models/material.js';
import PackingKit from '../models/packing_kit.js';
import Product from '../models/product.js';
import Unit from '../models/unit.js';
import { calculations_materials } from '../middleware/calculations_materials.js';
import { checkNotRepitMaterial, checkNotRepitPackingKits } from '../helpers/checkHelper.js';
import { qrCodeHelper } from '../helpers/qrCodeHelper.js';
import { calculations_kits } from '../middleware/calculations_kits.js';
import { calculations_others_expenses } from '../middleware/calculations_others_expenses.js';
import { putMaterialUpCurrentQty } from './materialService.js';
import { putPackingKitUpCurrentQty } from './packingKitService.js';
import OtherExpenses from '../models/other_expenses.js';

export const getProductsSimpleAll = async () => {
    try {
        return await Product.find({}).select('code name presentation status createdAt');
    } catch (error) {
        return error;
    }
};

export const getProductsExists = async (type, value) => {
    try {
        if (type === "code") {
            const product = await Product.exists({ code: value });
            return true ? product != null : false;
        }
        if (type === "name") {
            const product = await Product.exists({ name: value });
            return true ? product != null : false;
        }
    } catch (error) {
        return error;
    }
};

export const getProductsAll = async () => {
    try {
        return await Product.find({})
            .populate({
                path: "materials", populate: [
                    {
                        path: "material", model: Material, select: "code name",
                        populate: { path: "unit", model: Unit, select: "code" }
                    }
                ]
            })
            .populate({
                path: "packing_kits", populate: [
                    {
                        path: "packing_kit", model: PackingKit, select: "code name",
                        populate: { path: "unit", model: Unit, select: "code" }
                    }
                ]
            });
    } catch (error) {
        return error;
    }
};

export const getProductById = async (id) => {
    try {
        return await Product.findById({ _id: id })
            .populate({
                path: "materials", populate: [
                    {
                        path: "material", model: Material, select: "code name",
                        populate: { path: "unit", model: Unit, select: "code" }
                    }
                ]
            })
            .populate({
                path: "packing_kits", populate: [
                    {
                        path: "packing_kit", model: PackingKit, select: "code name",
                        populate: { path: "unit", model: Unit, select: "code" }
                    }
                ]
            })
            .populate({
                path: "others_expenses", populate: [
                    {
                        path: "other_expenses", model: OtherExpenses, select: "code name"
                    }
                ]
            });
    } catch (error) {
        return error;
    }
};

export const postProduct = async (req) => {
    try {
        const { code, name, description, presentation, boxes_x_mix, units_x_mix, margin_of_gain, pvp_x_boxes, pvp_x_units, materials, packing_kits, others_expenses, status } = req.body;

        if (await Product.exists({ code })) {
            return `The code ${code} no repeat`;
        }
        if (await Product.exists({ name })) {
            return `The code ${name} no repeat`;
        }
        if (!['in process', 'finished', 'slow'].includes(status)) {
            return `Status enum value invalid`;
        }

        const qr_code = await qrCodeHelper(code);

        const {
            materials_calc,
            total_m_qty_x_mix,
            total_m_cost_x_mix,
            total_m_cost_unit_x_mix,
            total_m_qty_x_box,
            total_m_cost_x_box,
            total_m_qty_x_unit,
            total_m_cost_x_unit,
        } = calculations_materials(
            {
                boxes_x_mix,
                units_x_mix,
                materials: materials !== undefined ? materials : [],
            }
        );

        const {
            packings_kits_calc,
            total_pk_cost_unit_x_mix,
            total_pk_qty_x_box,
            total_pk_cost_x_box,
            total_pk_qty_x_unit,
            total_pk_cost_x_unit,
        } = calculations_kits(
            {
                units_x_mix,
                packing_kits: packing_kits !== undefined ? packing_kits : [],
            }
        );

        const {
            others_expenses_calc,
            total_oe_cost_demanded,
            total_oe_cost_x_box,
            total_oe_cost_x_unit,
        } = calculations_others_expenses(
            {
                total_cost_x_box: total_m_cost_x_box + total_pk_cost_x_box,
                total_cost_x_unit: total_m_cost_x_unit + total_pk_cost_x_unit,
                others_expenses: others_expenses !== undefined ? others_expenses : [],
            }
        );

        const product = await Product.create(
            {
                code,
                qr_code,
                name,
                description,
                presentation,
                boxes_x_mix,
                units_x_mix,
                margin_of_gain,
                pvp_x_boxes,
                pvp_x_units,
                materials: materials !== undefined ? materials_calc : materials,
                packing_kits: packing_kits !== undefined ? packings_kits_calc : packing_kits,
                others_expenses: others_expenses !== undefined ? others_expenses_calc : others_expenses,
                total_x_materials: materials !== undefined ? {
                    total_qty_x_mix: total_m_qty_x_mix,
                    total_cost_x_mix: total_m_cost_x_mix,
                    total_cost_unit_x_mix: total_m_cost_unit_x_mix,
                    total_qty_x_box: total_m_qty_x_box,
                    total_cost_x_box: total_m_cost_x_box,
                    total_qty_x_unit: total_m_qty_x_unit,
                    total_cost_x_unit: total_m_cost_x_unit
                } : undefined,
                total_x_packing_kits: packing_kits !== undefined ? {
                    total_cost_unit_x_mix: total_pk_cost_unit_x_mix,
                    total_qty_x_box: total_pk_qty_x_box,
                    total_cost_x_box: total_pk_cost_x_box,
                    total_qty_x_unit: total_pk_qty_x_unit,
                    total_cost_x_unit: total_pk_cost_x_unit
                } : undefined,
                total_x_materials_packing_kits: packing_kits !== undefined ? {
                    total_cost_unit_x_mix: total_m_cost_unit_x_mix + total_pk_cost_unit_x_mix,
                    total_qty_x_box: total_m_qty_x_box + total_pk_qty_x_box,
                    total_cost_x_box: total_m_cost_x_box + total_pk_cost_x_box,
                    total_qty_x_unit: total_m_qty_x_unit + total_pk_qty_x_unit,
                    total_cost_x_unit: total_m_cost_x_unit + total_pk_cost_x_unit
                } : undefined,
                total_x_others_expenses: others_expenses !== undefined ? {
                    total_cost_demanded: total_oe_cost_demanded,
                    total_cost_x_box: total_oe_cost_x_box,
                    total_cost_x_unit: total_oe_cost_x_unit
                } : undefined,
                total_x_materials_packing_kits_others_expenses: packing_kits !== undefined ? {
                    total_cost_demanded: total_oe_cost_demanded,
                    total_cost_x_box: total_m_cost_x_box + total_pk_cost_x_box + total_oe_cost_x_box,
                    total_cost_x_unit: total_m_cost_x_unit + total_pk_cost_x_unit + total_oe_cost_x_unit
                } : undefined,
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
        const { code, name, description, presentation, boxes_x_mix, units_x_mix, margin_of_gain, pvp_x_boxes, pvp_x_units, materials, packing_kits, status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return `The id ${id} is not valid`;
        }
        if (await Product.exists({ code })) {
            return `The code ${code} no repeat`;
        }
        if (await Product.exists({ name })) {
            return `The code ${name} no repeat`;
        }
        if (!['in process', 'finished', 'slow'].includes(status)) {
            return `Status enum value invalid`;
        }

        let materialsLocal = materials !== undefined ? materials : [];
        let materialsOld = [];

        let packing_kitsLocal = packing_kits !== undefined ? packing_kits : [];
        let packing_kitsOld = [];

        await getProductById(id).then(item => {
            if (materials !== undefined) {
                item.materials.forEach(async element_material => {

                    const checkNotRepitM = checkNotRepitMaterial({
                        'materialId': element_material.material._id.toString(),
                        'materials': materialsLocal
                    });

                    if (checkNotRepitM.error === false) {
                        const cal = element_material;
                        materialsOld.push(
                            {
                                "material": element_material.material._id.toString(),
                                "qty_x_mix": cal.qty_x_mix,
                                "cost_x_mix": cal.cost_x_mix
                            }
                        );
                        return;
                    }
                    const materialDelete = element_material.material._id.toString();

                    await putMaterialUpCurrentQty(materialsLocal);

                    const removeMaterial = materialsLocal.filter(m => m.material.toString() !== materialDelete);
                    materialsLocal = removeMaterial;
                });
            }

            if (packing_kits !== undefined) {
                item.packing_kits.forEach(async element_packing_kit => {

                    const checkNotRepitPk = checkNotRepitPackingKits({
                        'packingKitId': element_packing_kit.packing_kit._id.toString(),
                        'packingKits': packing_kitsLocal
                    });

                    if (checkNotRepitPk.error === false) {
                        const cal = element_packing_kit;
                        packing_kitsOld.push(
                            {
                                "packing_kit": element_packing_kit.packing_kit._id.toString(),
                                "cost_unit_x_mix": cal.cost_unit_x_mix,
                                "qty_x_box": cal.qty_x_box
                            }
                        );
                        return;
                    }
                    const packingKitDelete = element_packing_kit.packing_kit._id.toString();

                    await putPackingKitUpCurrentQty(packing_kitsLocal);

                    const removePacking_kit = packing_kitsLocal.filter(p => p.packing_kit.toString() !== packingKitDelete);
                    packing_kitsLocal = removePacking_kit;
                });
            }
        });

        const newsMaterials = [...materialsOld, ...materialsLocal];
        const newsPackingKits = [...packing_kitsOld, ...packing_kitsLocal];

        const {
            materials_calc,
            total_m_qty_x_mix,
            total_m_cost_x_mix,
            total_m_cost_unit_x_mix,
            total_m_qty_x_box,
            total_m_cost_x_box,
            total_m_qty_x_unit,
            total_m_cost_x_unit,
        } = calculations_materials(
            {
                boxes_x_mix,
                units_x_mix,
                materials: newsMaterials,
            }
        );

        const {
            packings_kits_calc,
            total_pk_cost_unit_x_mix,
            total_pk_qty_x_box,
            total_pk_cost_x_box,
            total_pk_qty_x_unit,
            total_pk_cost_x_unit,
        } = calculations_kits(
            {
                units_x_mix,
                packing_kits: newsPackingKits,
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
            margin_of_gain,
            pvp_x_boxes,
            pvp_x_units,
            materials: materials !== undefined ? materials_calc : materials,
            packing_kits: packing_kits !== undefined ? packings_kits_calc : packing_kits,
            total_x_materials: materials !== undefined ? {
                total_qty_x_mix: total_m_qty_x_mix,
                total_cost_x_mix: total_m_cost_x_mix,
                total_cost_unit_x_mix: total_m_cost_unit_x_mix,
                total_qty_x_box: total_m_qty_x_box,
                total_cost_x_box: total_m_cost_x_box,
                total_qty_x_unit: total_m_qty_x_unit,
                total_cost_x_unit: total_m_cost_x_unit
            } : undefined,
            total_x_packing_kits: packing_kits !== undefined ? {
                total_cost_unit_x_mix: total_pk_cost_unit_x_mix,
                total_qty_x_box: total_pk_qty_x_box,
                total_cost_x_box: total_pk_cost_x_box,
                total_qty_x_unit: total_pk_qty_x_unit,
                total_cost_x_unit: total_pk_cost_x_unit
            } : undefined,
            total_x_materials_packing_kits: packing_kits !== undefined ? {
                total_cost_unit_x_mix: total_m_cost_unit_x_mix + total_pk_cost_unit_x_mix,
                total_qty_x_box: total_m_qty_x_box + total_pk_qty_x_box,
                total_cost_x_box: total_m_cost_x_box + total_pk_cost_x_box,
                total_qty_x_unit: total_m_qty_x_unit + total_pk_qty_x_unit,
                total_cost_x_unit: total_m_cost_x_unit + total_pk_cost_x_unit
            } : undefined,
            status,
            _id: id
        };

        return await Product.findByIdAndUpdate(id, newProduct, { new: true });

    } catch (error) {
        return error;
    }
};

export const delProduct = async (id) => {
    try {
        await getProductById(id).then(item => {
            if (item.materials.length !== 0) {
                const materialsQtyUp = [];
                item.materials.forEach(async element_material => {
                    const cal = element_material;
                    materialsQtyUp.push(
                        {
                            "material": element_material.material._id.toString(),
                            "qty_x_mix": cal.qty_x_mix,
                            "cost_x_mix": cal.cost_x_mix
                        }
                    );
                    await putMaterialUpCurrentQty(materialsQtyUp);
                });
            }

            if (item.packing_kits.length !== 0) {
                const packing_kitsQtyUp = [];
                item.packing_kits.forEach(async element_packing_kit => {
                    const cal = element_packing_kit;
                    packing_kitsQtyUp.push(
                        {
                            "packing_kit": element_packing_kit.packing_kit._id.toString(),
                            "cost_unit_x_mix": cal.cost_unit_x_mix,
                            "qty_x_box": cal.qty_x_box
                        }
                    );
                    await putPackingKitUpCurrentQty(packing_kitsQtyUp);
                });
            }
        });

        return await Product.findByIdAndDelete({ _id: id });

    } catch (error) {
        return error;
    }
};