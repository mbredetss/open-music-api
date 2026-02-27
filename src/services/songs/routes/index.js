import express from 'express';
import validate from '../../../middlewares/validate.js';
import { songsPayloadSchema } from '../validator/schema.js';
import { createSongs, getSongs, updateSongs, deleteSongs } from '../controller/songs-controller.js';

const router = express.Router();

router.post('/', validate(songsPayloadSchema), createSongs);
router.get('/:id', getSongs);
router.get('/', getSongs);
router.put('/:id', validate(songsPayloadSchema), updateSongs);
router.delete('/:id', deleteSongs);

export default router;