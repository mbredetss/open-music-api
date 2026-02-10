import express from 'express';
import { createAlbum, deleteAlbum, getAlbumById, albumLike, updateAlbum, cancelAlbumLike, getAlbumLike } from '../controller/album-controller.js';
import validate from '../../../middlewares/validate.js';
import { albumPayloadSchema } from '../validator/schema.js';
import { upload } from '../../covers/storage/storage-config.js';
import { uploadCoverImages } from '../../covers/controller/upload-controller.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = express.Router();

router.post('/', express.json(), validate(albumPayloadSchema), createAlbum);
router.get('/:id', getAlbumById);
router.put('/:id', express.json(), validate(albumPayloadSchema), updateAlbum);
router.delete('/:id', deleteAlbum);
router.post('/:id/covers', upload.single('cover'), uploadCoverImages);
router.post('/:id/likes', authenticateToken, albumLike);
router.delete('/:id/likes', authenticateToken, cancelAlbumLike);
router.get('/:id/likes', getAlbumLike);

export default router;