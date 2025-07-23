const pool = require('../db'); 

async function seedDatabase() {
    // Get a client from the connection pool
    const client = await pool.connect();
    console.log('Database connection established.');

    try {
        console.log('Starting to seed articles...');

        await germanArticlesSeed(client);

        console.log('Successfully seeded articles table.');

    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // Make sure to release the client and end the pool
        client.release();
        await pool.end();
        console.log('Database connection closed.');
    }
}

// Run the seeding function
seedDatabase();