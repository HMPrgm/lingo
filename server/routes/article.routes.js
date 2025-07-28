const express = require('express');
const r = express.Router();
const Article = require('../models/article.model.js');

// Create a new article
r.post('/', async (req, res) => {
  const { title, content, excerpt, imageUrl, category, difficulty, tags, language } = req.body;
  try {
    const article = await Article.create(title, content, excerpt, imageUrl, category, difficulty, tags, language);
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Get an article by ID
r.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findById(id);
    if (article) {
      res.status(200).json(article);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to retrieve article' });
  }
});

r.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Article.delete(id);
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

// Get all articles
r.get('/', async (req, res) => {
  try {
    const articles = await Article.findAll();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve articles' });
  }
});

r.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, excerpt, imageUrl, category, difficulty, tags, language } = req.body;
  try {
    const updatedArticle = await Article.update(id, title, content, excerpt, imageUrl, category, difficulty, tags, language);
    if (updatedArticle) {
      res.status(200).json(updatedArticle);
    } else {
      res.status(404).json({ error: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

module.exports = r;