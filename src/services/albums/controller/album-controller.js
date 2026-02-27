import { nanoid } from 'nanoid';
import { response } from '../../../utils/index.js';
import albumRepositories from '../repositories/album-repositories.js';
import CacheService from '../../../cache/redis-service.js';

export const createAlbum = async (req, res) => {
  const { name, year } = req.validated;
  const albumId = `album-${nanoid(16)}`;

  const result = await albumRepositories.createAlbum(albumId, name, year);

  if (result.rowCount > 0) {
    return response(res, 201, null, {
      albumId
    });
  }
  return response(res, 400, 'Album gagal ditambahkan!', null);
};

export const getAlbumById = async (req, res) => {
  const albumId = req.params.id;

  const result = await albumRepositories.getAlbumById(albumId);

  const isIdAlbumContain = result.rowCount > 0;

  if (isIdAlbumContain) {
    let songs;
    // Mengecek apakah ada data lagu-lagu di album?
    if (result.rows[0].songsId) {
      // jika ada, songs akan berisi array yang didalamnya ada objek lagu (id, title performer)
      songs = result.rows.map((song) => {
        const { title, performer } = song;
        return {
          id: song.songsId,
          title,
          performer,
        };
      });
    } else {
      // jika tidak ada, songs akan berisi array kosong
      songs = [];
    }

    const { name, year, coverUrl } = result.rows[0];

    const album = {
      id: albumId,
      name,
      year,
      coverUrl,
      songs
    };

    return response(res, 200, null, {
      album,
    });
  }

  return response(res, 404, 'Album tidak ditemukan!', null);
};

export const updateAlbum = async (req, res) => {
  const albumId = req.params.id;
  const { name, year } = req.validated;

  const result = await albumRepositories.updateAlbum(name, year, albumId);

  if (result.rowCount > 0) {
    return response(res, 200, 'Album berhasil diperbarui!', null);
  }

  return response(res, 404, 'Album tidak ditemukan!', null);
};

export const deleteAlbum = async (req, res) => {
  const albumId = req.params.id;

  const result = await albumRepositories.deleteAlbum(albumId);

  if (result.rowCount > 0) {
    return response(res, 200, 'Album berhasil dihapus!', null);
  }

  return response(res, 404, 'Album tidak ditemukan!', null);
};

export const albumLike = async (req, res) => {
  const userId = req.user.id;
  const albumId = req.params.id;
  const cacheService = new CacheService();

  try {
    await albumRepositories.albumLike(userId, albumId);
    await cacheService.delete(albumId);
    return response(res, 201, 'Berhasil menyukai album', null);
  } catch (e) {
    if (e.code === '23505') {
      return response(res, 400, 'Anda sudah menyukai album ini');
    }
    return response(res, 404, 'Album tidak ditemukan', null);
  }
};

export const cancelAlbumLike = async (req, res) => {
  const userId = req.user.id;
  const albumId = req.params.id;
  const cacheService = new CacheService();

  const result = await albumRepositories.cancelAlbumLike(userId, albumId);

  if (result > 0) {
    await cacheService.delete(albumId);
    return response(res, 200, 'Menyukai album telah dibatalkan', null);
  }

  return response(res, 400, 'Anda belum menyukai album ini', null);
};

export const getAlbumLike = async (req, res) => {
  const id = req.params.id;
  const cacheService = new CacheService();

  try {
    const result = await cacheService.get(id);
    const likes = JSON.parse(result);

    res.set('X-Data-Source', 'cache');
    return response(res, 200, null, likes);
  } catch {
    const likes = await albumRepositories.getAlbumLike(id);

    await cacheService.set(id, JSON.stringify({
      likes
    }), 1800);

    return response(res, 200, null, { likes });
  }
};