import styled from "styled-components";
import Movies from "./componentsHomePage/Movies";
import axios from "axios";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v8/cineflex/movies"
    );
    promise.then((response) => setMoviesList(response.data));
    promise.catch((err) => alert(err.response.data.message));
  }, []);

  return (
    <PageContainer>
      Selecione o filme
      <ListContainer>
        {moviesList.length === 0 ? (
          <div>Carregando lista de filmes...</div>
        ) : (
          moviesList.map((movie) => (
            <Movies
              key={movie.id}
              id={movie.id}
              src={movie.posterURL}
              alt={movie.title}
            />
          ))
        )}
      </ListContainer>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-top: 70px;
`;
const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 10px;
`;
