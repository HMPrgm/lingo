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
    pgm.createTable('vocab', {
        id: 'id',
        word: {
            type: 'varchar(255)',
            notNull: true,
        },
        language_code: {
            type: 'varchar(5)',
            notNull: true,
        },
        definition: {
            type: 'text',
            notNull: true,
        },
        part_of_speech: {
            type: 'varchar(50)',
            notNull: true,
        },
        pronunciation_ipa: {
            type: 'varchar(255)',
            notNull: false,
        },
        audio_url: {
            type: 'varchar(255)',
            notNull: false,
        },
        image_url: {
            type: 'varchar(255)',
            notNull: false,
        },
        created_at: {
            type: 'timestamp with time zone',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    }, {
        unique: ['word', 'language_code']

    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('vocab');
};
