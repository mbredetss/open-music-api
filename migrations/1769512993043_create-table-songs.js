/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
    pgm.createTable('songs', {
        id: {
            type: 'CHAR(21)',
            primaryKey: true,
        },
        title: {
            type: "VARCHAR(100)",
            notNull: true
        },
        year: {
            type: 'SMALLINT',
            notNull: true
        },
        genre: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        performer: {
            type: 'VARCHAR(100)',
            notNull: true
        },
        duration: {
            type: 'SMALLINT',
            default: 0
        },
        albumId: {
            type: 'CHAR(22)',
            default: 'no album', 
            references: 'albums'
        }
    });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('songs');
 };
