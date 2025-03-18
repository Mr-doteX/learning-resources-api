import Joi from "joi";


export const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const resourceSchema = Joi.object({
    title:Joi.string().required(),
    link:Joi.string().required(),
    type:Joi.string().valid('course','book','tutorial').required(),
    pictures:Joi.array().items(Joi.string().required())
});

export const validators = {registerSchema, loginSchema, resourceSchema};
export default validators;