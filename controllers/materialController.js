import { getMaterialsAll, getMaterialById, postMaterial, putMaterial, delMaterial } from '../services/materialService.js';
import { getUnitById } from '../services/unitService.js';
import { getSupplierById } from '../services/supplierService.js';

export const getAll = async(_, res) => {
    try{
        const materials = await getMaterialsAll();
        res.status(200).json(materials)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const material = await getMaterialById(id);
        res.status(200).json(material)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { unit, supplier, code, name, description, entered_amount, status } = req.body;
        if (!(unit, code, name, description, entered_amount, status)) {
            return res.status(400).send("All input is required");
        }

        const unitExists = await getUnitById(unit);

        if(unitExists === null){
            return res.status(404).send("The unit id not exists, is required");
        }

        if(supplier !== null){
            const supplierExists = await getSupplierById(supplier);
            if(supplierExists === null){
                return res.status(404).send("The supplier id not exists, is required");
            }
        }

        const material = await postMaterial(req);

        res.status(201).json(material);
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

        const material = await putMaterial(req);

        res.status(201).json(material);
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

        const material = await delMaterial(id);

        res.status(202).json(material._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};