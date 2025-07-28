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
    pgm.createTable('user_vocab', {
        user_id: {
            type: 'INTEGER',
            notNull: true,
        },
        vocab_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'vocab(id)',
            onDelete: 'CASCADE',
        },
        learning_status: {
            type: 'VARCHAR(50)',
            default: 'learning',
        },
        article_id: {
            type: 'INTEGER',
            references: 'article(id)',
            onDelete: 'CASCADE',
        },
        notes: { type: 'TEXT' },
    });
    pgm.addConstraint('user_vocab', 'user_vocab_pk', 'PRIMARY KEY(user_id, vocab_id)');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('user_vocab');
};


