import express from 'express';
import { login, newAccessToken, deleteRefreshAccessToken } from '../controller/authentication-controller.js';
import validate from '../../../middlewares/validate.js';
import { credentialPayloadSchema, tokenPayloadSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/', express.json(), validate(credentialPayloadSchema), login);
router.put('/', express.json(), validate(tokenPayloadSchema), newAccessToken);
router.delete('/', express.json(), validate(tokenPayloadSchema), deleteRefreshAccessToken);

export default router;