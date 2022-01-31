import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401)
            throw new Error('Not Authorized, Token failed.');
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: verified.id });
        req.user = user;
        console.log(req.user);
        next();

    } catch (e) {

        res.status(401)
        throw new Error('Not Authorized, Token failed.');
    }
});


export { protect }