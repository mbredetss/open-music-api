import express from 'express';
import albums from '../services/albums/routes/index.js';
import songs from '../services/songs/routes/index.js';

const router = express.Router();

router.use('/albums', albums);
router.use('/songs', songs);

export default router;