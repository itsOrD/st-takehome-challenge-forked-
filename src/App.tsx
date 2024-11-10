import "./App.css";
import ArticleCard from "./components/ArticleCard/ArticleCard";

function App() {

  const testArticle = {
    "articleId": 22,
    "title": "Article One",
    "articleURL": "https://example.com/1",
    "thumbnailURL": "https://dummyimage.com/780x500/CB6015/E8DDCB",
    "articleType": "Article",
    "primarySection": "Politics",
    "author": "Sarah Doe",
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean eu lacus vel sem egestas efficitur. Mauris feugiat ex dui, et mattis nibh tempor id."
  }

  return (
    <div>
      <ArticleCard article={testArticle}/>
    </div>
  );
}

export default App;
