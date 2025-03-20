import IArticle from "./IArticle";

export default interface INewsApiResponse {
  status: string;
  totalResults: number;
  results: IArticle[];
}
