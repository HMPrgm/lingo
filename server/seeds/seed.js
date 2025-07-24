import pool from '../db.js'; 
import germanArticlesSeed from './01-german-articles.js';

async function clearArticlesTable(client) {
    try {
        await client.query('DELETE FROM articles');
        console.log('Articles table cleared.');
    } catch (error) {
        console.error('Error clearing articles table:', error);
    }
}

async function seedDatabase() {
    const client = await pool.connect();
    console.log('Database connection established.');

    try {
        console.log('Clearing articles table...');
        
        await clearArticlesTable(client);

        console.log('Articles table cleared. Starting to seed...');

        await germanArticlesSeed(client);

        console.log('Successfully seeded articles table.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        client.release();
        await pool.end();
        console.log('Database connection closed.');
    }
}

seedDatabase();