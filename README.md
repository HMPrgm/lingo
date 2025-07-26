# Lingo: Read, Learn, Export
Lingo is a minimalist, open-source alternative to language learning platforms like LingQ. It's designed for one core purpose: to help you learn vocabulary through reading and seamlessly export it to Anki for review. Lingo currently supports Spanish, German, and Italian.

A clean, distraction-free interface to keep you focused on what matters: reading.
## Why Lingo?
Many language platforms are powerful but can be bloated with features, slow, or lock essential tools behind a paywall. Lingo strips it all back to the essentials. It's built on a simple, effective learning loop:
1. Read: Import any text you find interesting.
2. Understand: Click on unfamiliar words to see simple example sentences that help you grasp the meaning in context.
3. Export: Send your new vocabulary to Anki with a single click. For free. Always.
## Core Features
- Import Your Own Content: Paste any text directly into the app to create a new lesson.
- Read other stories and articles: Browse our extensive library of content to find something interesting to read.
- One-Click Anki Export: Generate a perfectly formatted `.csv` file of your Vocab words. The file includes the word, the original sentence for context, and is ready for immediate import into Anki.
- Open Source & Free: Lingo is 100% free and open-source. No ads, no subscriptions. Host it yourself, modify it, or contribute to its development.
## Tech Stack
Lingo is built with a modern and maintainable tech stack, making it easy for others to contribute.
- Frontend: React (Vite) with TypeScript
- Styling: Tailwind CSS
- Backend: Node.js with Express
- Database: Postgres
## Getting Started (For Devs)
Want to run Lingo on your own machine? Here’s how to get started.
### Prerequisites
- Node.js
- Docker
### Installation & Setup
Clone the repository:
```
git clone https://github.com/HMPrgm/lingo.git
cd lingo
```
Install dependencies for both frontend and backend:
```
# From the root directory
npm install && (cd client && npm install) && (cd server && npm install)
```
Configure Environment Variables:
Create a .env file in the server directory. You can copy the .env.example file as a template.
```
# .env in /server
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=lingodb
DATABASE_URL=postgres://postgres:postgres@localhost:5432/lingodb

# Passport.js and JWT Secret
# Replace with a long, random, and secure string
JWT_SECRET=

# Google OAuth 2.0 Credentials
# Replace with the actual credentials from your Google Cloud Console
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# The base URL of your frontend application
# Used for redirecting after successful login
CLIENT_URL=http://localhost:3000
```
Initialize the Database:
```
npm run docker
```
Run the Development Server
```
npm run dev
```
The Lingo client should now be running at http://localhost:3000.
