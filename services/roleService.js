import '../config/database.js';
import Role from '../models/role.js';

export const getRoleAll = async() => {
    try{
        return await Role.find();
    }catch(error){
        return error;
    }
};

export const getRoleById = async(id) => {
    try{
        return await Role.findById({_id: id});
    }catch(error){
        return error;
    }
};