import { Pool } from "pg";
import CacheService from "../../../cache/redis-service.js";

class AlbumRepositories {
    constructor() {
        this.pool = new Pool();
        this.cacheService = new CacheService();
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
            VALUES($1, $2)
            RETURNING album_id`, [userId, id]
        );

        await this.cacheService.delete(id);
    }

    async cancelAlbumLike(userId, id) {
        const result = await this.pool.query(
            `DELETE FROM user_album_likes
            WHERE user_id = $1 AND album_id = $2`, [userId, id]
        );

        await this.cacheService.delete(id);
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