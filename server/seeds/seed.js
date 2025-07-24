import pool from '../db.js'; 
import germanArticlesSeed from './01-german-articles.js';

async function seedDatabase() {
    const client = await pool.connect();
    console.log('Database connection established.');

    try {
        console.log('Starting to seed articles...');

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