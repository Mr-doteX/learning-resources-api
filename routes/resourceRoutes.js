import { Router } from 'express';
import auth from '../middleware/auth.js';
import {validators} from '../validators/authValidator.js';
import Resource from '../models/resource.js';


const router = Router();
// add resources 
router.post('/', auth, async(req,res) => {
    try{
        const {error} = resourceSchema.validate(req.body);
        if (error) return res.status(400).json
({message:error.details[0].message});

// create resource
const resource = new Resource({
    ...req.body, user: req.user._id, image:req.file?.filename
});

await resource.save();
res.status(201).json(resource);
}catch(error){res.status(500).json({message: 'server error'})};
});

// get/view reources
router.get('/', auth, async (req,res) => {
    try{
        const resources = await Resource.find({user:req.user._id});
        res.json(resources);
    }catch(error){res.status(500).json({message:'server error'});
}
});

// delete resources
router.delete('/:id', auth, async (req,res) => {
    try{
        const resource = await Resources.findOneAndDelete({_id:req.params.id, user:req.user._id});

        if(!resource) return res.status(404).json({message:'Resource not found!'});
        
        res.json({message:'oh I clear Am !'});

    }catch (error){res.status(500).json({message:'server error'});
}
});

export default router;