import styled from "styled-components";

export default function PurchaseInfo({ ticketInfo }) {
  return (
    <>
      <TextContainer data-test="movie-info">
        <strong>
          <p>Filme e sessão</p>
        </strong>
        <p>{ticketInfo.movie.movie.title}</p>
        <p>
          {ticketInfo.movie.day.date} - {ticketInfo.movie.day.weekday}
        </p>
      </TextContainer>

      <TextContainer data-test="seats-info">
        <strong>
          <p>Ingressos</p>
        </strong>
        {ticketInfo.seatName.map((seatChosen) => (
          <p key={seatChosen}>Assento {seatChosen}</p>
        ))}
      </TextContainer>

      <TextContainer data-test="client-info">
        <strong>
          <p>Comprador</p>
        </strong>
        {ticketInfo.buyerInfo.compradores.map((buyer) => (
          <>
            <p>Nome: {buyer.name}</p>
            <p>CPF: {buyer.cpf}</p>
          </>
        ))}
      </TextContainer>
    </>
  );
}

const TextContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 30px;
  strong {
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
