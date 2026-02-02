/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createType('action_type', ['add', 'delete']);
    pgm.createTable('activities', {
        action: {
            type: 'action_type', 
            notNull: true
        }, 
        time: {
            type: 'TIMESTAMPTZ', 
            notNull: true, 
            default: pgm.func('CURRENT_TIMESTAMP')
        }, 
        playlist_id: {
            type: 'CHAR(25)',
            references: 'playlists', 
            onDelete: 'CASCADE'
        }, 
        user_id: {
            type: 'CHAR(21)', 
            references: 'users', 
            onDelete: 'CASCADE'
        }, 
        song_id: {
            type: 'CHAR(21)', 
            references: 'songs', 
            onDelete: 'CASCADE'
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('activities');
    pgm.dropType('action_type');
};
