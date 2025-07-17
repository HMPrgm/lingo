-- This script will be executed when the container is first created.

-- Create the 'users' table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  google_id VARCHAR(255) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  -- Add a field for local password authentication (optional)
  password VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- You could add more tables or initial data here.
-- For example:
-- INSERT INTO users (email, google_id) VALUES ('test@example.com', '12345');