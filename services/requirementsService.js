import '../config/database.js';
import Category from '../models/category.js';
import Product from '../models/product.js';
import Unit from '../models/unit.js';

export const getRequirementsAll = async () => {
    try {
        const requirements = await Product.find({})
            .select('code category unit name boxes_x_mix units_x_mix margin_of_gain pvp_x_boxes pvp_x_units total_x_materials status createdAt')
            .populate({ path: "unit", model: Unit, select: "code name" })
            .populate({ path: "category", model: Category, select: "name" });

        const response = [];

        requirements.map((_, index) => {
            const { code, category, name, unit, boxes_x_mix, units_x_mix, total_x_materials } = requirements[index];

            const {
                total_qty_x_box,
                total_cost_x_box,
                total_cost_x_mix,
                total_cost_x_unit,
            } = total_x_materials[0];

            const qty_x_mix = total_qty_x_box / total_cost_x_mix;
            const qty_fab_x_box = boxes_x_mix * units_x_mix;
            const qty_fab_x_unit = boxes_x_mix * units_x_mix;

            response.push({
                "code": code,
                "category": category,
                "name": name,
                "unit": unit.code,
                "boxes_x_mix": boxes_x_mix,
                "units_x_mix": units_x_mix,
                "qty_x_mix": qty_x_mix.toFixed(2),
                "kgs_qty_x_box": total_qty_x_box,
                "cost_fab_x_mix": total_cost_x_mix,
                "qty_fab_x_box": qty_fab_x_box,
                "cost_fab_x_box": total_cost_x_box,
                "qty_fab_x_unit": qty_fab_x_unit,
                "cost_fab_x_unit": total_cost_x_unit,
            });
        });

        return response;
    } catch (error) {
        return error;
    }
};
