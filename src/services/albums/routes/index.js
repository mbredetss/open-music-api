import express from 'express';
import { createAlbum, deleteAlbum, getAlbumById, updateAlbum } from '../controller/album-controller.js';
import validate from '../../../middlewares/validate.js';
import { albumPayloadSchema } from '../validator/schema.js';
import { upload } from '../../covers/storage/storage-config.js';
import { uploadCoverImages } from '../../covers/controller/upload-controller.js';

const router = express.Router();

router.post('/', express.json(), validate(albumPayloadSchema), createAlbum);
router.get('/:id', getAlbumById);
router.put('/:id', express.json(), validate(albumPayloadSchema), updateAlbum);
router.delete('/:id', deleteAlbum);
router.post('/:id/covers', upload.single('cover'), uploadCoverImages);

export default router;