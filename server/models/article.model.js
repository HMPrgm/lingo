const pool = require('../db'); // Import the PostgreSQL pool

class Article {
  constructor(id, title, content, authorId) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
  }

  static async create(title, content, authorId) {
    const result = await pool.query(
      'INSERT INTO articles (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, authorId]
    );
    return new Article(result.rows[0].id, result.rows[0].title, result.rows[0].content, result.rows[0].author_id);
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      return new Article(result.rows[0].id, result.rows[0].title, result.rows[0].content, result.rows[0].author_id);
    }
    return null;
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM articles');
    return result.rows.map(row => new Article(row.id, row.title, row.content, row.author_id));
  }
}