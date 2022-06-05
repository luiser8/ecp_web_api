import { getSuppliersAll, getSupplierById, postSupplier, putSupplier, delSupplier } from '../services/supplierService.js';

export const getAll = async(_, res) => {
    try{
        const suppliers = await getSuppliersAll();
        res.status(200).json(suppliers)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const supplier = await getSupplierById(id);
        res.status(200).json(supplier)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { identifier, name, description, email, phone, address } = req.body;
        if (!(identifier, name, description, email, phone, address)) {
            return res.status(400).send("All input is required");
        }

        const supplier = await postSupplier(req);

        res.status(201).json(supplier);
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

        const supplier = await putSupplier(req);

        res.status(201).json(supplier);
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

        const supplier = await delSupplier(id);

        res.status(202).json(supplier._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};