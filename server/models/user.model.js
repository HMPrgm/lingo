const pool = require('../db');

class User {
    constructor(id, google_id, email, created_at) {
        this.id = id;
        this.google_id = google_id;
        this.email = email;
        this.created_at = created_at;
    }

    static async findById(id) {
        const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            return new User(result.rows[0].id, result.rows[0].google_id, result.rows[0].email, result.rows[0].created_at);
        }
        return null;
    }

    static async findByGoogleId(google_id) {
        const result = await pool.query('SELECT * FROM users WHERE google_id = $1', [google_id]);
        if (result.rows.length > 0) {
            return new User(result.rows[0].id, result.rows[0].google_id, result.rows[0].email, result.rows[0].created_at);
        }
        return null;
    }

    static async findByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (result.rows.length > 0) {
            return new User(result.rows[0].id, result.rows[0].google_id, result.rows[0].email, result.rows[0].created_at);
        }
        return null;
    }

    static async addVocab(vocab_id, learning_status = "learning", article_id = null) {
        const result = await pool.query('INSERT INTO vocab (vocab_id, learning_status, article_id) VALUES ($1, $2, $3) RETURNING *', [vocab_id, learning_status, article_id]);
    }

    static async getUserVocab() {
        const result = await pool.query(`
            SELECT v.*
            FROM vocab v
            JOIN user_vocab uv ON v.id = uv.vocab_id
            WHERE uv.user_id = $1;
        `,[this.id]);
        return result.rows;
    }

}

module.exports = User;