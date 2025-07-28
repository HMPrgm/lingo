const pool = require('../db'); 

class Article {
  constructor(id, title, content, excerpt, imageUrl, category, difficulty, tags, language) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.excerpt = excerpt;
    this.imageUrl = imageUrl;
    this.category = category;
    this.difficulty = difficulty;
    this.tags = tags;
    this.language = language;
  }

  static async create(title, content, excerpt, imageUrl, category, difficulty, tags, language) {
    const result = await pool.query(
      'INSERT INTO articles (title, content, excerpt, image_url, category, difficulty, tags, language) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [title, content, excerpt, imageUrl, category, difficulty, tags, language]
    );
    return new Article(result.rows[0].id, result.rows[0].title, result.rows[0].content, result.rows[0].excerpt, result.rows[0].image_url, result.rows[0].category, result.rows[0].difficulty, result.rows[0].tags, result.rows[0].language);
  }

  static async findById(id) {
    const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      return new Article(result.rows[0].id, result.rows[0].title, result.rows[0].content, result.rows[0].excerpt, result.rows[0].image_url, result.rows[0].category, result.rows[0].difficulty, result.rows[0].tags, result.rows[0].language);
    }
    return null;
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM articles');
    return result.rows.map(row => new Article(row.id, row.title, row.content, row.excerpt, row.image_url, row.category, row.difficulty, row.tags, row.language));
  }
}

module.exports = Article;