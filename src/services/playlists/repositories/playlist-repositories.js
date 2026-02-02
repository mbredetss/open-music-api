import { Pool } from 'pg';

class PlaylistRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addPlaylist(id, name, userId) {
    await this.pool.query(
      `INSERT INTO playlists
            VALUES($1, $2, $3) RETURNING id`, [id, name, userId]
    );
  }

  async getPlaylist(userId) {
    const result = await this.pool.query(
      `SELECT p.id, name, username FROM playlists as p
            LEFT JOIN collaborations ON p.id = playlist_id
            JOIN users as u ON u.id = owner
            WHERE user_id = $1 OR owner = $1`, [userId]
    );

    return result.rows;
  }

  async deletePlaylist(id) {
    const result = await this.pool.query(
      `DELETE FROM playlists
            WHERE id = $1 RETURNING id`, [id]
    );

    return result.rowCount;
  }

  async getPlaylistAuthor(id) {
    const result = await this.pool.query(
      `SELECT owner as "userId" FROM playlists
            WHERE id = $1`, [id]
    );
    return result.rows[0];
  }

  async getPlaylistNameById(id) {
    const result = await this.pool.query(
      `SELECT name FROM playlists
            WHERE id = $1`, [id]
    );

    return result.rows;
  }

  async addSongToPlaylist(id, songId, userId) {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      await client.query(
        `INSERT INTO playlist_songs
                VALUES($1, $2)`, [id, songId]
      );

      const time = new Date().toISOString();
      await client.query(
        `INSERT INTO activities
                VALUES($1, $2, $3, $4, $5)`, ['add', time, id, userId, songId]
      );

      await client.query('COMMIT');
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async verifyPlaylistAuthor(id, userId) {
    const result = await this.getPlaylistAuthor(id);

    const playlistAuthor = result.userId;

    return userId == playlistAuthor;
  }

  async getSongInPlaylist(id) {
    const result = await this.pool.query(
      `SELECT p.id, name, s.id as song_id, title, performer, username 
            FROM playlists as p
            JOIN playlist_songs ON playlist = p.id
            JOIN songs as s ON "songId" = s.id
            JOIN users ON users.id = owner
            WHERE p.id = $1`, [id]
    );

    return result.rows;
  }

  async deleteSongInPlaylist(id, songId, userId) {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      const result = await client.query(
        `DELETE FROM playlist_songs
                WHERE playlist = $1 AND "songId" = $2 
                RETURNING playlist`, [id, songId]
      );

      const time = new Date().toISOString();
      await client.query(
        `INSERT INTO activities
                VALUES($1, $2, $3, $4, $5)`, ['delete', time, id, userId, songId]
      );

      await client.query('COMMIT');

      return result.rows[0];
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  }

  async getPlaylistActivity(id) {
    const result = await this.pool.query(
      `SELECT username, title, action, time FROM activities
            JOIN users AS u ON u.id = user_id
            JOIN songs AS s ON s.id = song_id
            WHERE playlist_id = $1`, [id]
    );

    return result.rows;
  }
}

export default new PlaylistRepositories();