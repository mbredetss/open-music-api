import Joi from 'joi';

export const exportsPayloadSchema = Joi.object({
    targetEmail: Joi.string().email({ tlds: true }).required()
});