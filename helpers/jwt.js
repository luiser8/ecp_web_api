import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const sign = async (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_KEY, { expiresIn: "7h"}
    );
}
export const signrefresh = async (user) => {
    return jwt.sign(user, process.env.REFRESH_TOKEN_KEY, { expiresIn: "14d"}
    );
}
