import { getOtherExpensesAll, getOtherExpensesById, postOtherExpenses, putOtherExpenses, delOtherExpenses } from '../services/otherExpensesService.js';

export const getAll = async(_, res) => {
    try{
        const otherExpenses = await getOtherExpensesAll();
        res.status(200).json(otherExpenses)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const otherExpenses = await getOtherExpensesById(id);
        res.status(200).json(otherExpenses)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { unit, name, description } = req.body;
        if (!(unit, name, description)) {
            return res.status(400).send("All input is required");
        }

        const otherExpenses = await postOtherExpenses(req);

        res.status(201).json(otherExpenses);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};

export const put = async(req, res) => {
    try{
        const { id } = req.params;
        if (!(id)) {
            return res.status(400).send("Id for put is required");
        }

        const otherExpenses = await putOtherExpenses(req);

        res.status(201).json(otherExpenses);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};

export const del = async(req, res) => {
    try{
        const { id } = req.params;
        if (!(id)) {
            res.status(400).send("Id other expenses is required");
        }

        const otherExpenses = await delOtherExpenses(id);

        res.status(202).json(otherExpenses._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};