import playlistRepositories from '../services/playlists/repositories/playlist-repositories.js';
import { response } from '../utils/index.js';

export const verifyPlaylistAccess = async (req, res, next) => {
  const userId = req.user.id;
  const playlistId = req.params.id;

  const isPlaylistExist = (await playlistRepositories.getPlaylistNameById(playlistId)).length;

  if (isPlaylistExist === 0) {
    return response(res, 404, 'Playlist tidak ditemukan', null);
  }

  const isUserHasAccess = await playlistRepositories.verifyPlaylistAccess(playlistId, userId);

  if (isUserHasAccess) {
    return next();
  }

  return response(res, 403, 'Unauthorized', null);
};