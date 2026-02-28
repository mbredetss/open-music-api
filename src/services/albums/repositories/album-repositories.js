import { Pool } from 'pg';
import CacheService from '../../../cache/redis-service.js';

class AlbumRepositories {
  constructor() {
    this.pool = new Pool();
    this.cacheService = new CacheService();
  }

  async createAlbum(id, name, year) {
    return await this.pool.query(
      `INSERT INTO albums 
      VALUES ($1, $2, $3) 
      RETURNING id`,
      [id, name, year]
    );
  }

  async getAlbumById(id) {
    const result = await this.pool.query(
      `SELECT albums.id as "albumId", albums.name as name, albums.year as year, "coverUrl", songs.id as "songsId", songs.title as title, songs.performer as performer 
      FROM albums 
      LEFT JOIN songs ON albums.id = songs."albumId" 
      WHERE albums.id = $1`, [id]
    );

    if (result.rowCount == 0) return null;

    const { albumId, name, year, coverUrl, songsId } = result.rows[0];

    const album = {
      id: albumId,
      name,
      year,
      coverUrl,
      songs: songsId ? result.rows.map((row) => {
        const { title, performer } = row;
        return {
          id: row.songsId,
          title,
          performer,
        };
      }) : []
    };

    return album;
  }

  async updateAlbum(name, year, id) {
    return await this.pool.query(
      `UPDATE albums 
      SET name = $1, year = $2 
      WHERE id=$3 
            RETURNING id`,
      [name, year, id]
    );
  }

  async deleteAlbum(id) {
    return this.pool.query(
      `DELETE FROM albums 
      WHERE id=$1`, [id]
    );
  }

  async updateAlbumCover(coverUrl, id) {
    const result = await this.pool.query(
      `UPDATE albums
      SET "coverUrl" = $1
      WHERE id = $2
      RETURNING id`, [coverUrl, id]
    );

    return result.rowCount;
  }

  async albumLike(userId, id) {
    await this.pool.query(
      `INSERT INTO user_album_likes
      VALUES($1, $2)`, [userId, id]
    );
  }

  async cancelAlbumLike(userId, id) {
    const result = await this.pool.query(
      `DELETE FROM user_album_likes
      WHERE user_id = $1 AND album_id = $2`, [userId, id]
    );

    return result.rowCount;
  }

  async getAlbumLike(id) {
    const result = await this.pool.query(
      `SELECT COUNT(*) as total_likes FROM user_album_likes
      WHERE album_id = $1`, [id]
    );
    return parseInt(result.rows[0].total_likes);
  }
}

export default new AlbumRepositories();