import { getUsersAll, getUserById, loginUser, postUser, putUser, delUser } from '../services/userService.js';

export const getAll = async(_, res) => {
    try{
        const users = await getUsersAll();
        res.status(200).json(users)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const getById = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await getUserById(id);
        res.status(200).json(user)
    }catch(error){
        res.status(404).json({error:error.message});
    }
};

export const post = async(req, res) => {
    try{
        const { identifier, firstname, lastname, email, username, password } = req.body;
        if (!(identifier, firstname, lastname, email, username, password)) {
            return res.status(400).send("All input is required");
        }

        const user = await postUser(req);

        res.status(201).json(user._id);
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

        const user = await putUser(req);

        res.status(201).json(user._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};

export const login = async(req, res) => {
    try{
        const { username, password } = req.body;
        if (!(username, password)) {
            res.status(400).send("All input is required");
        }

        const user = await loginUser(req);
        if(user === "Invalid Credentials"){
            res.status(200).send(user);
        }else{
            res.status(200).json(user);
        }

    }catch(error){
        res.status(409).json({error:error.message});
    }
};

export const del = async(req, res) => {
    try{
        const { id } = req.params;
        if (!(id)) {
            res.status(400).send("Id User is required");
        }

        const user = await delUser(id);

        res.status(202).json(user._id);
    }catch(error){
        res.status(409).json({error:error.message});
    }
};