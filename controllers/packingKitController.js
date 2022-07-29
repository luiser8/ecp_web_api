import { getPackingKitAll, getPackingKitById, postPackingKit, putPackingKit, delPackingKit, getPackingKitCodeExists } from '../services/packingKitService.js';

export const getAll = async(_, res) => {
    try{
        const packingKits = await getPackingKitAll();
        res.status(200).json(packingKits)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const packingKit = await getPackingKitById(id);
        res.status(200).json(packingKit)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getCodeExists = async(req, res) => {
    try{
        const { code } = req.params;
        const packingKit = await getPackingKitCodeExists(code);
        res.status(200).json(packingKit)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { unit, code, name, description, entered_amount, current_amount, purchase_price } = req.body;
        if (!(unit, code, name, description, entered_amount, current_amount, purchase_price)) {
            return res.status(400).send("All input is required");
        }

        const packingKit = await postPackingKit(req);

        res.status(201).json(packingKit._id);
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

        const packingKit = await putPackingKit(req);

        res.status(201).json(packingKit._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};

export const del = async(req, res) => {
    try{
        const { id } = req.params;
        if (!(id)) {
            res.status(400).send("Id packing kit is required");
        }

        const packingKit = await delPackingKit(id);

        res.status(202).json(packingKit._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};