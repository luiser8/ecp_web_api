export const calculations_others_expenses = (...values) => {
    const { total_cost_x_box, total_cost_x_unit, others_expenses } = values[0];
    let total_oe_cost_demanded = 0;
    let total_oe_cost_x_box = 0;
    let total_oe_cost_x_unit = 0;

    others_expenses.map((_, item) => {
        if (others_expenses.length !== 0) {
            const calc = others_expenses[item];
            const { total_cost_demanded } = calc;
            calc.cost_x_box = total_cost_demanded / total_cost_x_box;
            calc.cost_x_unit = total_cost_demanded / total_cost_x_unit;

            total_oe_cost_x_box += calc.cost_x_box;
            total_oe_cost_x_unit += calc.cost_x_unit;
            total_oe_cost_demanded += total_cost_demanded;
        }
    });
    return {
        others_expenses_calc: others_expenses,
        total_oe_cost_demanded,
        total_oe_cost_x_box,
        total_oe_cost_x_unit,
    };
}
