import { getCategoryById } from '../services/categoryService.js';
import { getOtherExpensesAll, getOtherExpensesById, postOtherExpenses, putOtherExpenses, delOtherExpenses, getOtherExpensesExists, getOtherExpensesByProducts } from '../services/otherExpensesService.js';

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

export const getExists = async(req, res) => {
    try{
        const { type, value } = req.params;
        const otherExpenses = await getOtherExpensesExists(type, value);
        res.status(200).json(otherExpenses)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getByProd = async(req, res) => {
    try{
        const { others } = req.params;
        const otherExpenses = await getOtherExpensesByProducts(others);
        res.status(200).json(otherExpenses);
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { code, category, name, description } = req.body;
        if (!(code, category, name, description)) {
            return res.status(400).send("All input is required");
        }

        const categoryExists = await getCategoryById(category);

        if(categoryExists === null){
            return res.status(404).send("The category id not exists, is required");
        }

        const otherExpenses = await postOtherExpenses(req);

        res.status(201).json(otherExpenses._id);
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

        res.status(201).json(otherExpenses._id);
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