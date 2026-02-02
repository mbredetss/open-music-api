import { Pool } from 'pg';

class SongRepositories {
  constructor() {
    this.pool = new Pool();
  }

  async getSongById(id) {
    const result = await this.pool.query(
      `SELECT * FROM songs
            WHERE id=$1`, [id]
    );

    return result.rows[0];
  }
}

export default new SongRepositories();