import Joi from 'joi';

export const songsPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number(),
  albumId: Joi.string(),
});

export const songsQuerySchema = Joi.object({
  title: Joi.string(),
  performer: Joi.string()
});