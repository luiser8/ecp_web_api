import { getProductsAll, getProductById, postProduct, putProduct, delProduct } from '../services/productService.js';
import { putMaterialDownCurrentQty } from '../services/materialService.js';
import { putPackingKitDownCurrentQty } from '../services/packingKitService.js';

export const getAll = async(_, res) => {
    try{
        const products = await getProductsAll();
        res.status(200).json(products)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const product = await getProductById(id);
        res.status(200).json(product)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { code, name, description, presentation, boxes_x_mix, units_x_mix, status } = req.body;
        if (!(code, name, description, presentation, boxes_x_mix, units_x_mix, status)) {
            return res.status(400).send("All input is required");
        }

        const product = await postProduct(req);

        if(product.materials.length !== 0){
            await putMaterialDownCurrentQty(product.materials);
        }

        if(product.packing_kits.length !== 0){
            await putPackingKitDownCurrentQty(product.packing_kits);
        }

        res.status(201).json(product);
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

        const product = await putProduct(req);

        if(product.materials.length !== 0){
            await putMaterialDownCurrentQty(product.materials);
        }

        if(product.packing_kits.length !== 0){
            await putPackingKitDownCurrentQty(product.packing_kits);
        }

        res.status(201).json(product);
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

        const product = await delProduct(id);

        res.status(202).json(product._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};