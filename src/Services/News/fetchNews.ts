import axios from "axios";
import { Category } from "@prisma/client";

interface FetchNewsParams {
  country?: string;
  category?: Category;
  keywords?: string;
  page?: number;
}

const fetchNews = async ({
  country,
  category,
  keywords,
  page,
}: FetchNewsParams) => {
  try {
    const params: Record<string, string | number | undefined> = {
      country,
      apikey: process.env.NEWS_API_KEY!,
      q: keywords,
      page,
    };

    {
      category && category === Category.OTHER
        ? (params.category = "general")
        : (params.category = category?.toLowerCase());
    }

    Object.keys(params).forEach((key) => {
      if (params[key] === undefined) {
        delete params[key];
      }
    });

    console.log("Fetching news from GNews with params:", params);

    const response = await axios.get("https://gnews.io/api/v4/top-headlines", {
      params,
    });

    if (
      !response.data ||
      !response.data.articles ||
      !Array.isArray(response.data.articles)
    ) {
      console.error("Invalid API response:", response.data);
      throw new Error("The API response is invalid or articles are missing.");
    }

    console.log("Successfully fetched news:", response.data.articles.length);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching news:", error.message, error.stack);
    throw new Error(error.response?.data?.message || "Failed to fetch news.");
  }
};

export default fetchNews;
