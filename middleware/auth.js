import jwt from 'jsonwebtoken';
import User from '../models/user.js';



const auth = async function (req, res, next) {
    try {
        const token = req.header('Authorization').replace('Owner', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({_id:decoded._id});

        if (!user) throw new Error();
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Masa Authenticate!' });
    }
}

export default auth