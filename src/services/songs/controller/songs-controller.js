import { nanoid } from 'nanoid';
import { pool } from '../../../db/index.js';
import { response } from '../../../utils/index.js';
import SongRepositories from '../repositories/song-repositories.js';

export const createSongs = async (req, res) => {
  const { title, year, genre, performer, duration, albumId } = req.body;
  const id = `song-${nanoid(16)}`;

  const result = await pool.query(
    'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
    [
      id,
      title,
      year,
      genre,
      performer,
      duration,
      albumId
    ]
  );

  if (result.rowCount > 0) {
    const songId = result.rows[0].id;

    return response(res, 201, null, {
      songId
    });
  }
};

export const getSongs = async (req, res) => {
  const id = req.params.id;
  const { title, performer } = req.query;

  if (id) {
    const song = await SongRepositories.getSongById(id);

    if (song) {
      return response(res, 200, null, { song });
    }

    return response(res, 404, 'Lagu tidak ditemukan!', null);
  } else if (title && performer) {
    const result = await pool.query(
      `SELECT id, title, performer FROM songs
            WHERE title ILIKE $1 AND performer ILIKE $2`,
      [`%${title}%`, `%${performer}%`]
    );

    const songs = result.rows;

    return response(res, 200, null, { songs });
  } else if (title) {
    const result = await pool.query(
      `SELECT id, title, performer FROM songs
            WHERE title ILIKE $1`, [`%${title}%`]
    );

    const songs = result.rows;

    return response(res, 200, null, { songs });
  } else if (performer) {
    const result = await pool.query(
      `SELECT id, title, performer FROM songs
            WHERE performer ILIKE $1`, [`%${performer}%`]
    );

    const songs = result.rows;

    return response(res, 200, null, { songs });
  }

  const result = await pool.query(
    'SELECT id, title, performer FROM songs'
  );

  const songs = result.rows;

  return response(res, 200, null, { songs });
};

export const updateSongs = async (req, res) => {
  const { title, year, genre, performer, duration, albumId } = req.body;
  const id = req.params.id;

  const result = await pool.query(
    `UPDATE songs 
        SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, "albumId" = $6 
        WHERE id = $7 RETURNING id`,
    [title, year, genre, performer, duration, albumId, id]
  );

  if (result.rowCount > 0) {
    return response(res, 200, 'Lagu berhasil diperbarui!', null);
  }

  return response(res, 404, 'Lagu tidak ditemukan!', null);
};

export const deleteSongs = async (req, res) => {
  const id = req.params.id;

  const result = await pool.query(
    `DELETE FROM songs
        WHERE id = $1`, [id]
  );

  if (result.rowCount > 0) {
    return response(res, 200, 'Lagu berhasil dihapus!', null);
  }

  return response(res, 404, 'Lagu tidak ditemukan!', null);
};