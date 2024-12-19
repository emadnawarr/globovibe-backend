import axios from "axios";

//TODO:category type enum
//TODO:parameter to interface read DTO
//TODO:response should be entity DTO
const fetchNews = async (
  country?: string,
  category?: string,
  sources?: string,
  keywords?: string,
  pageSize?: number,
  page?: number
) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines?", {//TODO: convert to string in public folder
      params: {
        country: country,
        apiKey: process.env.NEWS_API_KEY,
        category: category,
        sources: sources,
        q: keywords,
        pageSize: pageSize,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchNews;
