import { useEffect, useState } from "react";
import BasicCard from "./components/BasicCard";
import { Rings } from  'react-loader-spinner'
import "./index.css";

export default function App() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let url = "https://dev.to/api/articles";
        function getArticles() {
            fetch(url)
                //This operation returns a promise that could either resolve or reject
                // we must resolve the Response object to JSON format using the json() method
                .then((response) => response.json())
                // This also returns a promise and from there, we can resolve to get the actual data that we need
                .then((articles) => {
                    console.log(articles);
                    setData(articles);
                    setError(null);
                })
                // In case the promise rejects, we will handle the error using the catch()
                .catch((err) => {
                    setError(err.message);
                    setData(null);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
        getArticles();
    }, []);

    const articlesArray = data?.map((article) => (
        <BasicCard
            key={article.id}
            alt={article.alt}
            date={article.created_at}
            description={article.description}
            imgPath={article.cover_image}
            link="Read more"
            title={article.title}
            url={article.url}
        />
    ));

    if (!loading && !error) {
        return (
            <div className="App">
                <h1>Articles</h1>
                <div className="articles">{data && articlesArray}</div>
            </div>
        );
    } else if (error) {
        return <div>There is a problem fetching the post data - {error}</div>;
    } else {
        return (<Rings
          height = "80"
          width = "80"
          radius = "9"
          color = 'green'
          ariaLabel = 'three-dots-loading'     
          
        />);
    }
}
