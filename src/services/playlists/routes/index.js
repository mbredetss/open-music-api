import express from 'express';
import { addPlaylist, getPlaylist, addSongToPlaylist, deletePlaylist, getSongInPlaylist, deleteSongInPlaylist, getPlaylistActivity } from '../controller/playlist-controller.js';
import authenticateToken from '../../../middlewares/auth.js';
import validate from '../../../middlewares/validate.js';
import { playlistNamePayloadSchema, songIdPayloadSchema } from '../validator/schema.js';
import { verifyPlaylistAuthor } from '../../../middlewares/verify-author.js';
import { verifyPlaylistAccess } from '../../../middlewares/verify-playlist-acess.js';

const router = express.Router();

router.post('/', authenticateToken, express.json(), validate(playlistNamePayloadSchema), addPlaylist);
router.get('/', authenticateToken, getPlaylist);
router.delete('/:id', authenticateToken, verifyPlaylistAuthor, deletePlaylist);
router.post('/:id/songs', authenticateToken, express.json(), validate(songIdPayloadSchema), verifyPlaylistAccess, addSongToPlaylist);
router.get('/:id/songs', authenticateToken, verifyPlaylistAccess, getSongInPlaylist);
router.delete('/:id/songs', authenticateToken, express.json(), validate(songIdPayloadSchema), verifyPlaylistAccess, deleteSongInPlaylist);
router.get('/:id/activities', authenticateToken, verifyPlaylistAccess, getPlaylistActivity);

export default router;