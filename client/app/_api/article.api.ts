const axios = require('axios');
import Article from '../_types/article.type';
const ARTICLES_BASE = '/api/articles';

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await axios.get(ARTICLES_BASE);
    return response.data;
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};

export const fetchArticleById = async (id: string): Promise<Article> => {
  try {
    const response = await axios.get(`${ARTICLES_BASE}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching article with ID ${id}:`, error);
    throw error;
  }
};
