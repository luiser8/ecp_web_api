import { getPackingKitAll, getPackingKitById, postPackingKit, putPackingKit, delPackingKit, getPackingKitsExists, getPackingKitsSimpleAll, getPackingKitsSingleById, getPackingKitsByProducts } from '../services/packingKitService.js';
import { getUnitById } from '../services/unitService.js';
import { getSupplierById } from '../services/supplierService.js';

export const getSimpleAll = async(_, res) => {
    try{
        const packingKits = await getPackingKitsSimpleAll();
        res.status(200).json(packingKits)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

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

export const getPackingKitExists = async(req, res) => {
    try{
        const { type, value } = req.params;
        const packingKit = await getPackingKitsExists(type, value);
        res.status(200).json(packingKit)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getCurrentQtyById = async(req, res) => {
    try{
        let packingKitQtyError = {};
        const { id, qty } = req.params;
        const packingKit = await getPackingKitsSingleById(id);

        packingKitQtyError = qty > packingKit.current_amount ? {
            'msj': 'Quantity not passed',
            'diference': packingKit.current_amount - qty
        } : {
            'msj': 'Quantity ok passed',
            'diference': packingKit.current_amount - qty
        };
        res.status(200).json(packingKitQtyError);
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getByProd = async(req, res) => {
    try{
        const { packingkit } = req.params;
        const packingKits = await getPackingKitsByProducts(packingkit);
        res.status(200).json(packingKits);
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { unit, supplier, code, name, description, entered_amount, purchase_price , status } = req.body;
        if (!(unit, supplier, code, name, description, entered_amount, purchase_price, status)) {
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