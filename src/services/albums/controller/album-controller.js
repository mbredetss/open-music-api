import { nanoid } from 'nanoid';
import { pool } from '../../../db/index.js';
import { response } from '../../../utils/index.js';

export const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const id = `album-${nanoid(16)}`;

  const result = await pool.query(
    `INSERT INTO albums 
            VALUES ($1, $2, $3) 
            RETURNING id`,
    [id, name, year]
  );

  if (result.rowCount > 0) {
    const albumId = result.rows[0].id;
    return response(res, 201, null, {
      albumId
    });
  }
  return response(res, 400, 'Album gagal ditambahkan!', null);
};

export const getAlbumById = async (req, res) => {
  const albumId = req.params.id;

  const result = await pool.query(
    'SELECT id FROM albums WHERE id = $1', [albumId]
  );

  const isIdAlbumContain = result.rowCount > 0;

  if (isIdAlbumContain) {
    const result = await pool.query(
      `SELECT albums.id as "albumId", albums.name as name, albums.year as year, songs.id as "songsId", songs.title as title, songs.performer as performer 
        FROM albums 
        JOIN songs ON albums.id = songs."albumId" 
        WHERE "albumId"=$1`, [albumId]
    );

    if (result.rowCount) {
      const { id, name, year } = result.rows[0];

      const songs = result.rows.map((song) => ({
        id: song.songsId,
        title: song.title,
        performer: song.performer,
      }));

      const album = {
        id,
        name,
        year,
        songs
      };

      return response(res, 200, null, {
        album,
      });
    }

    const getAlbum = await pool.query(
      `SELECT *
            FROM albums
            WHERE id = $1`, [albumId]
    );
    const { id, name, year } = getAlbum.rows[0];
    const albums = {
      id,
      name,
      year,
      songs: []
    };

    return response(res, 200, null, {
      album: albums
    });
  }

  return response(res, 404, 'Album tidak ditemukan!', null);
};

export const updateAlbum = async (req, res) => {
  const id = req.params.id;
  const { name, year } = req.body;

  const result = await pool.query(
    `UPDATE albums 
        SET name = $1, year = $2 
        WHERE id=$3 
        RETURNING id`,
    [name, year, id]
  );

  if (result.rowCount > 0) {
    return response(res, 200, 'Album berhasil diperbarui!', null);
  }

  return response(res, 404, 'Album tidak ditemukan!', null);
};

export const deleteAlbum = async (req, res) => {
  const id = req.params.id;

  const result = await pool.query(
    `DELETE FROM albums 
        WHERE id=$1`, [id]
  );

  if (result.rowCount > 0) {
    return response(res, 200, 'Album berhasil dihapus!', null);
  }

  return response(res, 404, 'Album tidak ditemukan!', null);
};