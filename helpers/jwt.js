import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const sign = async (user) => {
    return jwt.sign(
        { user_id: user._id, user: user.username },
        process.env.ACCESS_TOKEN_KEY, { expiresIn: "7d"}
    );
}
export const signrefresh = async (user) => {
    return jwt.sign(
        { user_id: user._id, user: user.username },
        process.env.REFRESH_TOKEN_KEY, { expiresIn: "7d"}
    );
}
