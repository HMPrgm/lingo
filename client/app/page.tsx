'use client';
import React from 'react'
import ArticleCard from './article/article_card';
import { Article } from './article/[id]/page';

const articles: Article[] = [
  {
    id: 1,
    title: 'A Trip to the Local Market',
    excerpt: 'Discover common phrases and vocabulary for shopping for groceries and interacting with vendors.',
    imageUrl: 'https://placehold.co/600x400/a7f3d0/14532d?text=Market+Trip',
    category: 'Daily Life',
    difficulty: 'A1',
    tags: ['Shopping', 'Food', 'Conversation'],
  },
  {
    id: 2,
    title: 'Understanding the News Headlines',
    excerpt: 'Learn how to read and understand common structures in news reporting and journalism.',
    imageUrl: 'https://placehold.co/600x400/bae6fd/0c4a6e?text=News+Headlines',
    category: 'News & Media',
    difficulty: 'A2',
    tags: ['Current Events', 'Politics', 'Reading'],
  },
  {
    id: 3,
    title: 'The Art of Storytelling',
    excerpt: 'Explore past tenses and narrative techniques by reading a classic short story.',
    imageUrl: 'https://placehold.co/600x400/fecaca/991b1b?text=Storytelling',
    category: 'Literature',
    difficulty: 'A1',
    tags: ['Fiction', 'Culture', 'Grammar'],
  },
  {
    id: 4,
    title: 'Business Email Essentials',
    excerpt: 'Master the formal language needed to write professional emails for work.',
    imageUrl: 'https://placehold.co/600x400/e9d5ff/5b21b6?text=Business+Email',
    category: 'Business',
    difficulty: 'B1',
    tags: ['Work', 'Writing', 'Formal'],
  },
  {
    id: 5,
    title: 'Traveling by Train',
    excerpt: 'A guide to buying tickets, finding your platform, and understanding announcements.',
    imageUrl: 'https://placehold.co/600x400/fef08a/854d0e?text=Train+Travel',
    category: 'Travel',
    difficulty: 'A2',
    tags: ['Transportation', 'Conversation'],
  },
  {
    id: 6,
    title: 'A Debate on Technology',
    excerpt: 'An advanced text presenting arguments for and against the role of AI in society.',
    imageUrl: 'https://placehold.co/600x400/d1d5db/1f2937?text=Tech+Debate',
    category: 'Technology',
    difficulty: 'B2',
    tags: ['AI', 'Opinion', 'Discussion'],
  },
];

export default function page() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12 md:py-16">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">Welcome to Lingo!</h1>
            <p className="text-lg text-gray-600 mt-2">Improve your skills with articles tailored to your level.</p>
          </div>

          {/* Filters (Optional) */}
          <div className="mb-12 flex flex-col md:flex-row justify-center items-center gap-4">
            <select className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>All Difficulties</option>
              <option>A1</option>
              <option>A2</option>
              <option>B1</option>
              <option>B2</option>
              <option>C1</option>
              <option>C2</option>
            </select>
            <select className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
              <option>All Categories</option>
              <option>Daily Life</option>
              <option>News & Media</option>
              <option>Business</option>
              <option>Travel</option>
            </select>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}
