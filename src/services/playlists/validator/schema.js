import Joi from 'joi';

export const playlistNamePayloadSchema = Joi.object({
  name: Joi.string().required()
});

export const songIdPayloadSchema = Joi.object({
  songId: Joi.string().required()
});