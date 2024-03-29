import { getCategoryAll, getCategoryById, postCategory, putCategory, delCategory, getCategorySimpleAll, getCategoryExists, getCategoryByDad } from '../services/categoryService.js';

export const getSimpleAll = async(_, res) => {
    try{
        const category = await getCategorySimpleAll();
        res.status(200).json(category)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getAll = async(_, res) => {
    try{
        const category = await getCategoryAll();
        res.status(200).json(category)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const category = await getCategoryById(id);
        res.status(200).json(category)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getByDad = async(req, res) => {
    try{
        const { dad } = req.params;
        const category = await getCategoryByDad(dad);
        res.status(200).json(category)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getExists = async(req, res) => {
    try{
        const { type, value } = req.params;
        const category = await getCategoryExists(type, value);
        res.status(200).json(category)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { name, description, dad } = req.body;
        if (!(name, description, dad)) {
            return res.status(400).send("All input is required");
        }

        const category = await postCategory(req);

        res.status(201).json(category._id);
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

        const category = await putCategory(req);

        res.status(201).json(category._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};

export const del = async(req, res) => {
    try{
        const { id } = req.params;
        if (!(id)) {
            res.status(400).send("Id supplier is required");
        }

        const category = await delCategory(id);

        res.status(202).json(category._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};