import { Pool } from 'pg';

class CollaborationsRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async addCollaborator(id, userId, playlistId) {
    await this.pool.query(
      `INSERT INTO collaborations 
            VALUES($1, $2, $3)`, [id, userId, playlistId]
    );
  }

  async deleteCollaborator(playlistId, userId) {
    const result = await this.pool.query(
      `DELETE FROM collaborations
            WHERE playlist_id = $1 AND user_id = $2
            RETURNING user_id`, [playlistId, userId]
    );

    return result.rows[0];
  }
}

export default new CollaborationsRepositories();