import jwt from 'jsonwebtoken';
import { authjwt } from './keys';

export const AUTH = ({token}) => {
    jwt.verify(token, authjwt, async function(err, decoded) {
        if (err) return res.status(444).json("Not auth");
        return decoded.id
    });
}