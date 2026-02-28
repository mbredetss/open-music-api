import Joi from 'joi';

export const albumPayloadSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
  year: Joi.number().integer().min(1900).max(new Date().getFullYear()).required(), 
});