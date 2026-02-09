import { Pool } from "pg";

class AlbumRepositories {
    constructor() {
        this.pool = new Pool();
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
}

export default new AlbumRepositories();