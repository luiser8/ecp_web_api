export const calculations_kits = (...values) => {
    const { units_x_mix, packing_kits } = values[0];
    let total_pk_cost_unit_x_mix = 0;
    let total_pk_qty_x_box = 0;
    let total_pk_cost_x_box = 0;
    let total_pk_qty_x_unit = 0;
    let total_pk_cost_x_unit = 0;

    packing_kits.map((_, item) => {
        if(packing_kits.length !== 0){
            packing_kits[item].calculations.forEach(calc => {
                calc.cost_x_box = calc.cost_unit_x_mix * calc.qty_x_box;
                calc.qty_x_unit = calc.qty_x_box / units_x_mix;
                calc.cost_x_unit = calc.cost_x_box / units_x_mix;

                total_pk_cost_unit_x_mix += calc.cost_unit_x_mix;
                total_pk_qty_x_box += calc.qty_x_box;
                total_pk_cost_x_box += calc.cost_x_box;
                total_pk_qty_x_unit += calc.qty_x_unit;
                total_pk_cost_x_unit += calc.cost_x_unit;
            });
        }
    });
    return {
        packings_kits_calc: packing_kits,
        total_pk_cost_unit_x_mix,
        total_pk_qty_x_box,
        total_pk_cost_x_box,
        total_pk_qty_x_unit,
        total_pk_cost_x_unit,
    };
}
