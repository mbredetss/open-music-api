/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('user_album_likes', {
    user_id : {
      type: 'CHAR(21)',
      references: 'users',
    },
    album_id: {
      type: 'CHAR(22)',
      references: 'albums',
    }
  });

  pgm.createConstraint(
    'user_album_likes',
    'unique_user_album_likes',
    {
      unique: ['user_id', 'album_id'],
    }
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('user_album_likes');
};
