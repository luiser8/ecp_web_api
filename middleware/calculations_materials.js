export const calculations_materials = (...values) => {
    const { boxes_x_mix, units_x_mix, materials } = values[0];
    let total_m_qty_x_mix = 0;
    let total_m_cost_x_mix = 0;
    let total_m_cost_unit_x_mix = 0;
    let total_m_qty_x_box = 0;
    let total_m_cost_x_box = 0;
    let total_m_qty_x_unit = 0;
    let total_m_cost_x_unit = 0;

    materials.map((_, item) => {
        const calc = materials[item];
        calc.cost_unit_x_mix = calc.cost_x_mix / calc.qty_x_mix;
        calc.qty_x_box = calc.qty_x_mix / boxes_x_mix;
        calc.cost_x_box = calc.cost_x_mix / boxes_x_mix;
        calc.qty_x_unit = calc.qty_x_mix / units_x_mix;
        calc.cost_x_unit = calc.cost_x_mix / units_x_mix;

        total_m_qty_x_mix += calc.qty_x_mix;
        total_m_cost_x_mix += calc.cost_x_mix;
        total_m_cost_unit_x_mix += calc.cost_unit_x_mix;
        total_m_qty_x_box += calc.qty_x_box;
        total_m_cost_x_box += calc.cost_x_box;
        total_m_qty_x_unit += calc.qty_x_unit;
        total_m_cost_x_unit += calc.cost_x_unit;
    });
    return {
        materials_calc: materials,
        total_m_qty_x_mix,
        total_m_cost_x_mix,
        total_m_cost_unit_x_mix,
        total_m_qty_x_box,
        total_m_cost_x_box,
        total_m_qty_x_unit,
        total_m_cost_x_unit,
    };
}
