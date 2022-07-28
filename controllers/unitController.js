import { getUnitAll, getUnitById, postUnit, putUnit, delUnit } from '../services/unitService.js';

export const getAll = async(_, res) => {
    try{
        const units = await getUnitAll();
        res.status(200).json(units)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const unit = await getUnitById(id);
        res.status(200).json(unit)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { code, name } = req.body;
        if (!(code, name)) {
            return res.status(400).send("All input is required");
        }

        const unit = await postUnit(req);

        res.status(201).json(unit._id);
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

        const unit = await putUnit(req);

        res.status(201).json(unit._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};

export const del = async(req, res) => {
    try{
        const { id } = req.params;
        if (!(id)) {
            res.status(400).send("Id unit is required");
        }

        const unit = await delUnit(id);

        res.status(202).json(unit._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};