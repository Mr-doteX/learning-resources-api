import { resourceSchema } from '../validators/authValidator.js';
import Resource from '../models/resource.js';


// add new resources 
export const addResource = async(req,res) => {
    try{
        const {error} = resourceSchema.validate(req.body);
        if (error) return res.status(400).json
({message:error.details[0].message});

// create resource
const resource = new Resource({
    ...req.body, user: req.user._id, pictures:req.file?.map((file) => { return file.filename; }),
});

await resource.save();
res.status(201).json(resource);
}catch(error){res.status(500).json({message: 'server error'})};
};

// get/view all reources
export const getResource = async (req,res) => {
    try{
        const resources = await Resource.find({user:req.user._id});
        res.json(resources);
    }catch(error){res.status(500).json({message:'server error'});
}
};

// delete a resources
export const deleteResource =  async (req,res) => {
    try{
        const resource = await Resource.findOneAndDelete({_id:req.params.id, user:req.user._id});

        if(!resource) return res.status(404).json({message:'Resource not found!'});
        
        res.json({message:'oh I clear Am !'});

    }catch (error){res.status(500).json({message:'server error'});
}
};