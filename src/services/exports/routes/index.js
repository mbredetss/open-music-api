import express from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import validate from '../../../middlewares/validate.js';
import { exportsPayloadSchema } from '../validator/schema.js';
import { verifyPlaylistAuthor } from '../../../middlewares/verify-author.js';
import { exportPlaylists } from '../controller/export-controller.js';

const router = express.Router();

router.post('/:id', authenticateToken, verifyPlaylistAuthor, express.json(), validate(exportsPayloadSchema), exportPlaylists);

export default router;