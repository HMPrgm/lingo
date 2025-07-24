import React from 'react'
import Article from '../_types/article.type';
import Image from 'next/image';

export const difficultyColors = {
    A1: 'bg-green-100 text-green-800',
    A2: 'bg-yellow-100 text-yellow-800',
    B1: 'bg-orange-100 text-orange-800',
    B2: 'bg-red-100 text-red-800',
    C1: 'bg-purple-100 text-purple-800',
    C2: 'bg-blue-100 text-blue-800',
  };

export default function ArticleCard({ article }: { article: Article }) {
  

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <a href={`/article/${article.id}`} className="block">
        {/* <div className="relative">
          <Image 
            src={article.imageUrl} 
            alt={article.title} 
            width={400} 
            height={300}
          /> 
        </div> */}
        <div className="p-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-medium text-blue-600">{article.category}</p>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${difficultyColors[article.difficulty]}`}>
              {article.difficulty}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors">{article.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span key={tag} className="bg-gray-200 text-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
};