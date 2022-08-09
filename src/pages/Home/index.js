import { useEffect, useState } from "react";
import BasicCard from "../../components/BasicCard";
import { Rings } from "react-loader-spinner";

function Home() {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://dev.to/api/articles");

    let [inputValue, setInputValue] = useState("");
    let [information, setInformation] = useState("");

    useEffect(() => {
        function getArticles() {
            setLoading(true);
            fetch(url)
                //This operation returns a promise that could either resolve or reject
                // we must resolve the Response object to JSON format using the json() method
                .then((response) => response.json())
                // This also returns a promise and from there, we can resolve to get the actual data that we need
                .then((articles) => {
                    console.log(articles);
                    setData(articles);
                })

                .finally(() => {
                    setLoading(false);
                });
        }
        getArticles();
    }, [url]);

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

    function updateInputValue(event) {
        console.log(event.target.value);
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log("dentro do submit");
        if (inputValue) {
            setUrl(`https://dev.to/api/articles?tag=${inputValue}`);
            setInformation(`Find all about ${inputValue}`);
        } else {
            setInformation("Please search for an article topic");
        }
    }

    if (!loading) {
        return (
            <div className="App">
                <h1>Articles</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input type="search" onChange={updateInputValue} />
                        <button type="submit">Search</button>
                    </form>
                    <h3>Search for {inputValue}</h3>
                    <h4>{information}</h4>
                </div>
                <div className="articles">{data && articlesArray}</div>
            </div>
        );
    } else {
        return (
            <Rings
                height="80"
                width="80"
                radius="9"
                color="green"
                ariaLabel="three-dots-loading"
            />
        );
    }
}

export default Home;
