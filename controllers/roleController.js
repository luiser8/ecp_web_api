import { getRoleAll, getRoleById } from '../services/roleService.js';

export const getAll = async(_, res) => {
    try{
        const role = await getRoleAll();
        res.status(200).json(role)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const role = await getRoleById(id);
        res.status(200).json(role)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};