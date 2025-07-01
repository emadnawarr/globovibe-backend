import IArticle from "../interfaces/IArticle";

export interface eventWriteDto {
  article_id: string;
  title: string;
  description: string;
  publish_date: Date;
  source: string;
  language: string;
  country: {
    connect: { id: number };
  };
  category: string;
}

export const mapEventsWriteDto = (
  countryId: number,
  article: IArticle
): eventWriteDto => {
  const events: eventWriteDto = {
    article_id: article.article_id,
    title: article.title,
    description: article.description ?? "",
    publish_date: new Date(article.pubDate),
    source: article.source_name,
    language: article.language,
    country: {
      connect: { id: countryId },
    },
    category: "top",
  };
  return events;
};

function capitalizeFirstLetter(val: string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
