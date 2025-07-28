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
    pgm.createTable('examples', {
        id: 'id', // SERIAL PRIMARY KEY
        vocab_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'vocab(id)',
            onDelete: 'CASCADE',
        },
        sentence: {
            type: 'TEXT',
            notNull: true,
        },
        translation: {
            type: 'TEXT',
            notNull: false,
        },
    });

};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('examples');
};
