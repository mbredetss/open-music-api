import Joi from 'joi';

export const albumPayloadSchema = Joi.object({
  name: Joi.string().required().max(500),
  year: Joi.number().required()
});