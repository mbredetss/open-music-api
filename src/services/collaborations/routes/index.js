import express from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import { verifyPlaylistAuthor } from '../../../middlewares/verify-author.js';
import { addCollaborator, deleteCollaborator } from '../controller/collabotaions-controller.js';
import validate from '../../../middlewares/validate.js';
import { collaborationPayloadSchema } from '../schema/schema.js';

const router = express.Router();

router.post('/', authenticateToken, validate(collaborationPayloadSchema), verifyPlaylistAuthor, addCollaborator);
router.delete('/', authenticateToken, validate(collaborationPayloadSchema), verifyPlaylistAuthor, deleteCollaborator);

export default router;