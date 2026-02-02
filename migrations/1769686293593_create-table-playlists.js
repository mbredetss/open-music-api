/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('playlists', {
        id: {
            type: 'CHAR(25)', 
            primaryKey: true
        }, 
        name: {
            type: 'VARCHAR(100)', 
            notNull: true, 
        }, 
        owner: {
            type: 'CHAR(21)', 
            references: 'users', 
            notNull: true
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('playlists');
};
