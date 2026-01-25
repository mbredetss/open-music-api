import express from 'express';
import validate from '../../../middlewares/validate.js';
import { songsPayloadSchema, songsQuerySchema } from '../validator/schema.js';
import { createSongs, getSongs, updateSongs, deleteSongs } from '../controller/songs-controller.js';

const router = express.Router();

router.post('/', express.json(), validate(songsPayloadSchema), createSongs);
router.get('/:id', getSongs);
router.get('/', validate(songsQuerySchema),  getSongs);
router.put('/:id', express.json(), validate(songsPayloadSchema), updateSongs);
router.delete('/:id', deleteSongs);

export default router;