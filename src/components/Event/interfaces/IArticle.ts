interface IArticle {
  article_id: string;
  title: string;
  description: string;
  pubDate: Date;
  source_name: string;
  language: string;
  country: string[];
  category: string;
}

export default IArticle;
