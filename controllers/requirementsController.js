import { getRequirementsAll } from '../services/requirementsService.js';

export const getAll = async(_, res) => {
    try{
        const requirements = await getRequirementsAll();
        res.status(200).json(requirements)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};