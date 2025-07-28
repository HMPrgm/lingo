const pool = require('../db');

class Vocab {

    constructor(id, word, language_code, part_of_speech, pronunciation_ipa, audio_url, image_url) {
        this.id = id;
        this.word = word;
        this.language_code = language_code;
        this.part_of_speech = part_of_speech;
        this.pronunciation_ipa = pronunciation_ipa;
        this.audio_url = audio_url;
        this.image_url = image_url;
    }

    static async create(word, language_code, part_of_speech, pronunciation_ipa, audio_url, image_url) {
        const result = await pool.query(
            'INSERT INTO vocab(word, language_code, part_of_speech, pronunciation_ipa, audio_url, image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            ['word', 'language_code', 'part_of_speech', 'pronunciation_ipa', 'audio_url', 'image_url']
        );

        return new Vocab(
            result.rows[0]['id'],
            result.rows[0]['word'],
            result.rows[0]['language_code'],
            result.rows[0]['part_of_speech'],
            result.rows[0]['pronunciation_ipa'],
            result.rows[0]['audio_url'],
            result.rows[0]['image_url']
        );
    }

    static async getAll() {
        const result = await pool.query('SELECT * FROM vocab');
        return result.rows
        .map(
            (row) => new Vocab(row.id, row.word, row.language_code, row.part_of_speech, row.pronunciation_ipa, row.audio_url, row.image_url)
        );
    }


}

module.exports = Vocab;