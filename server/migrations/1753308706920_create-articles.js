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
    pgm.createTable('articles', {
        id: 'id',
        title: {
            type: 'varchar(255)',
            notNull: true,
        },
        content: {
            type: 'text',
            notNull: true,
        },
        excerpt: {
            type: 'text',
            notNull: true,
        },
        image_url: {
            type: 'varchar(255)',
            notNull: false,
        },
        category: {
            type: 'varchar(50)',
            notNull: true,
        },
        difficulty: {
            type: 'varchar(20)',
            values: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
            notNull: true,
        },
        tags: {
            type: 'text[]',
            notNull: false,
        },
        language: {
            type: 'varchar(50)',
            notNull: true,
        },
        created_at: {
            type: 'timestamp with time zone',
            notNull: true,
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
    pgm.dropTable('articles');
};
