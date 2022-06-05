import '../config/database.js';
import Role from '../models/role.js';

export const getRoleAll = async() => {
    try{
        const role = await Role.find();
        return role;
    }catch(error){
        return error;
    }
};

export const getRoleById = async(id) => {
    try{
        const role = await Role.findById({_id: id});
        return role;
    }catch(error){
        return error;
    }
};