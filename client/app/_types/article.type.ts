export default interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  category: string;
  difficulty: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  tags: string[];
  language: string;
}