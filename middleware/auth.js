import jwt from 'jsonwebtoken';
import User from '../models/user.js';



const auth = async function (req, res, next) {
    try {
        // extract token form authourization header
        const token = req.header('Authorization').replace('Bearer', '');
        if(!token){
            return res.status(401).json({message:"no token provided"});
        }
        consloe.log ("Authorizatuion Header:", req.header("Authorization"));

        // verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // find the user with the decoded id
        const user = await User.findOne({_id:decoded._id});
        if (!user) {return res.status(401).json({message:"Use not found!"})};
    
    //attach the user to the request    
        req.user = user;
        // call the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authenticate failed!' });
    }
}

export default auth;