import { eventWriteDto } from "../utils/eventDto";
import IArticle from "./IArticle";
import INewsParams from "./INewsParams";

export default interface IEventService {
  fetchNewsFromAPI(params: INewsParams): Promise<IArticle[]>;
  insertNews(country: string, articles: IArticle[]): Promise<void>;
  fetchEventByArticleId(article_id: string): Promise<eventWriteDto | null>;
}
