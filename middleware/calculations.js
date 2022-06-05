export const calculations = (...values) => {
    const { units_x_mix, materials } = values[0];
    const boxes_x_mix = units_x_mix * 0.02610417;
    let total_qty_x_mix = 0;
    let total_cost_x_mix = 0;
    let total_cost_unit_x_mix = 0;
    let total_qty_x_box = 0;
    let total_cost_x_box = 0;
    let total_qty_x_unit = 0;
    let total_cost_x_unit = 0;

    materials.map((_, item) => {
        materials[item].calculations.forEach(calc => {
            calc.cost_unit_x_mix = calc.cost_x_mix / calc.qty_x_mix;
            calc.qty_x_box = calc.qty_x_mix / boxes_x_mix;
            calc.cost_x_box = calc.cost_x_mix / boxes_x_mix;
            calc.qty_x_unit = calc.qty_x_mix / units_x_mix;
            calc.cost_x_unit = calc.cost_x_mix / units_x_mix;

            total_qty_x_mix += calc.qty_x_mix;
            total_cost_x_mix += calc.cost_x_mix;
            total_cost_unit_x_mix += calc.cost_unit_x_mix;
            total_qty_x_box += calc.qty_x_box;
            total_cost_x_box += calc.cost_x_box;
            total_qty_x_unit += calc.qty_x_unit;
            total_cost_x_unit += calc.cost_x_unit;
        });
    });
    return {
        materialscalc: materials,
        boxes_x_mix, 
        total_qty_x_mix, 
        total_cost_x_mix, 
        total_cost_unit_x_mix, 
        total_qty_x_box, 
        total_cost_x_box,
        total_qty_x_unit,
        total_cost_x_unit,
    };
}
