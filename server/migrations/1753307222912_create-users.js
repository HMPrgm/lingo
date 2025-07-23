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
    pgm.createTable('users', {
    // 'id' is a special type that creates a SERIAL PRIMARY KEY
    id: 'id',
    google_id: {
      type: 'varchar(255)',
      unique: true,
    },
    email: {
      type: 'varchar(255)',
      notNull: true,
      unique: true,
    },
    created_at: {
      type: 'timestamp with time zone',
      notNull: true,
      // Use pgm.func('...') to call a PostgreSQL function
      default: pgm.func('current_timestamp'),
    },
  });
  
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('users');
};
