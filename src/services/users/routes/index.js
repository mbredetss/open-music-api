import express from 'express';
import { createUser } from '../controller/user-controller.js';
import validate from '../../../middlewares/validate.js';
import { userPayloadSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/', express.json(), validate(userPayloadSchema), createUser);

export default router;