import { nanoid } from 'nanoid';
import { response } from '../../../utils/index.js';
import playlistRepositories from '../repositories/playlist-repositories.js';

export const addPlaylist = async (req, res) => {
  const name = req.body.name;
  const userId = req.user.id;
  const playlistId = `playlist-${nanoid(16)}`;

  await playlistRepositories.addPlaylist(playlistId, name, userId);

  return response(res, 201, null, { playlistId });
};

export const getPlaylist = async (req, res) => {
  const userId = req.user.id;
  const playlistResults = await playlistRepositories.getPlaylist(userId);

  const playlists = playlistResults.map((res) => ({
    id: res.id,
    name: res.name,
    username: res.username
  }));

  return response(res, 200, null, { playlists });

};

export const deletePlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const playlist = await playlistRepositories.deletePlaylist(playlistId);

  if (playlist) {
    return response(res, 200, 'Playlist berhasil dihapus!', null);
  }

  return response(res, 404, 'Playlist gagal dihapus!', null);
};

export const addSongToPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const songId = req.body.songId;
  const userId = req.user.id;
  try {
    await playlistRepositories.addSongToPlaylist(playlistId, songId, userId);

    const playlistName = (await playlistRepositories.getPlaylistNameById(playlistId))[0];

    return response(res, 201, `Lagu berhasil di tambahkan ke playlist '${playlistName.name}'`);
  } catch (e) {
    console.log(e);
    return response(res, 404, 'Lagu gagal ditambahkan!');
  }

};

export const getSongInPlaylist = async (req, res) => {
  const playlistId = req.params.id;

  const result = await playlistRepositories.getSongInPlaylist(playlistId);
  const songs = result.map((res) => ({
    id: res.song_id,
    title: res.title,
    performer: res.performer
  }));

  const { id, name, username } = result[0];
  const playlist = {
    id,
    name,
    username,
    songs
  };

  return response(res, 200, null, { playlist });
};

export const deleteSongInPlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const songId = req.body.songId;

  const playlist = await playlistRepositories.getPlaylistNameById(playlistId);
  const playlistName = playlist.name;
  const userId = req.user.id;

  try {
    const result = await playlistRepositories.deleteSongInPlaylist(playlistId, songId, userId);
    if (result) {
      return response(res, 200, `Lagu berhasil di hapus dari playlist '${playlistName}'`);
    }
  } catch (e) {
    console.log(e);
    return response(res, 400, 'Lagu gagal dihapus dari playlist!');
  }
};

export const getPlaylistActivity = async (req, res) => {
  const playlistId = req.params.id;
  const activities = await playlistRepositories.getPlaylistActivity(playlistId);

  return response(res, 200, null, {
    playlistId,
    activities
  });
};