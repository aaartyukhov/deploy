import React from "react";
import api from "../api/api";
import Input from "./Input";
import Button from "./Button";
import Spinner from "./Spinner";
import Card from "./Card";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);

    api
      .search(searchQuery)
      .then((data) => {
        setCards(
          data.results.map((item) => ({
            id: item.id,
            src: item.urls.regular,
            alt: item.alt_description,
            title: item.description,
            subtitle: item.user.name,
          }))
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchQuery]);

  return (
    <div className="App">
      <div className="App-content">
        <div className="App-search">
          <Input
            placeholder="Search free high-resolution photos"
            value={inputValue}
            handleChange={(e) => {
              setInputValue(e.target.value);
            }}
          />
          <Button
            title="Search"
            handleClick={() => setSearchQuery(inputValue)}
          />
        </div>
        <div className="App-cards">
          {isLoading ? (
            <Spinner />
          ) : (
            cards.map(({ id, ...props }) => <Card key={id} {...props} />)
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

// https://unsplash.com/developers

// 1. Сначала мы развернули CRA,
// 2. Потом оформили компоненты и спроектировали пропсы
// 3. Потом вынесли функциональность api в отдельный ООП-интерфейс
// 4. Написали хуки и функциональность в App
// 5. Вывели все на страницу
