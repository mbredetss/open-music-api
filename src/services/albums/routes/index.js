import express from 'express';
import { createAlbum, deleteAlbum, getAlbumById, updateAlbum } from '../controller/album-controller.js';
import validate from '../../../middlewares/validate.js';
import { albumPayloadSchema } from '../validator/schema.js';

const router = express.Router();

router.post('/', express.json(), validate(albumPayloadSchema),  createAlbum);
router.get('/:id', getAlbumById);
router.put('/:id', express.json(), validate(albumPayloadSchema), updateAlbum);
router.delete('/:id', deleteAlbum);

export default router;