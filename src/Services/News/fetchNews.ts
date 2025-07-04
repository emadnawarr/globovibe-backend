import IArticle from "../../components/Event/interfaces/IArticle";
import INewsApiResponse from "../../components/Event/interfaces/INewsApiResponse";
import INewsParams from "../../components/Event/interfaces/INewsParams";
import axios from "axios";

const fetchNews = async (params: INewsParams): Promise<IArticle[]> => {
  try {
    const apiKey = process.env.NEWS_API_KEY;
    if (!apiKey) throw new Error("API key is not in .env file!");

    const category = "top"; //ToDo: Categories
    const response = await axios.get("https://newsdata.io/api/1/latest", {
      params: { ...params, apiKey, category },
      timeout: 10000,
    });
    const data: INewsApiResponse = response.data;
    if (data.status != "success")
      throw new Error("Failed to fetch news from API!");

    return data.results;
  } catch (error) {
    //ToDo: bos 3al documentation of API for response errors
    throw error;
  }
};

export default fetchNews;
