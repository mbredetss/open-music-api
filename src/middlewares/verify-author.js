import playlistRepositories from '../services/playlists/repositories/playlist-repositories.js';
import { response } from '../utils/index.js';

export const verifyPlaylistAuthor = async (req, res, next) => {
  const playlistId = req.params.id ?? req.body.playlistId;
  const result = await playlistRepositories.getPlaylistAuthor(playlistId);

  if (!result) {
    return response(res, 404, 'Playlist tidak ditemukan!');
  }

  const playlistAuthor = result.userId;
  const userId = req.user.id;

  if (playlistAuthor === userId) {
    return next();
  }

  return response(res, 403, 'Unauthorized', null);
};