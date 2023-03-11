import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Sessions({ date, id, weekday, showtimes }) {
  return (
    <SessionContainer key={id} data-test="movie-day">
      {weekday} - {date}
      <ButtonsContainer>
        {showtimes.map((hour) => (
          <Link to={`/assentos/${hour.id}`}>
            <button key={hour.id} data-test="showtime">
              {hour.name}
            </button>
          </Link>
        ))}
      </ButtonsContainer>
    </SessionContainer>
  );
}

const SessionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: "Roboto";
  font-size: 20px;
  color: #293845;
  padding: 0 20px;
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 20px 0;
  button {
    margin-right: 20px;
    cursor: pointer;
  }
  a {
    text-decoration: none;
    color: #293845;
  }
`;
