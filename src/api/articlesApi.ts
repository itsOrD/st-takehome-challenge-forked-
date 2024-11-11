// Core API that interacts with "Article Service" endpoint
const ARTICLES_ENDPOINT = "https://stcom-public-resources.s3.us-west-2.amazonaws.com/articles30.json"

export interface Article {
  articleId: number;
  title: string;
  body: string;
  thumbnailURL: string;
  articleURL: string;
  // ToDo: add other fields as needed
}

export interface ArticlesResponse {
  articles: Article[];
}

export const fetchArticles = async (): Promise<Article[]> => {
  try {
    const response = await fetch(ARTICLES_ENDPOINT);
    if (!response.ok) {
      throw new Error(`HTTP error!  Status: ${response.status}`)
    }
    const data: ArticlesResponse = await response.json();
    return data.articles;
  } catch (error) {
    // ToDo: Add custom error types, implement partial response support & other improvements.
    //       Only use catch->throw pattern for a reason!
    throw {
      message: `Error during article fetch: 
        ${
          error instanceof Error
            ? error.message
            : 'Unknown error'
        }
      `
    }
  }
}
