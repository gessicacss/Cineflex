import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import CaptionCircles from "../../components/CaptionCircle";
import Footer from "../../components/Footer";
import {
  selectedSeatBG,
  selectedSeatBorder,
  availableSeatBG,
  availableSeatBorder,
  unavailableSeatBG,
  unavailableSeatBorder,
} from "../../constants/color";
import captionCirclesList from "../../constants/captionCirclesList";
import Seats from "./componentsSeatsPage/Seats";

export default function SeatsPage() {
  const { idSession } = useParams();
  const [seatsLists, setseatsLists] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState({ ids: [], compradores: [] });
  const navigate = useNavigate();

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSession}/seats`
    );
    promise.then((res) => {
      setseatsLists(res.data);
    });
    promise.catch((err) => alert(err.response.data.message));
  }, [idSession]);

  function removeSeat(seat) {}

  function selectSeat(seat) {
    if (seat.isAvailable === false) {
      alert("Esse assento não está disponível");
      return;
    }
    if (selected.some((seatChosen) => seatChosen.idAssento === seat.id)) {
      const isItFilled = buyerInfo.compradores.find(
        (oldSeat) => oldSeat.idAssento === seat.id
      );
      const buyerHasInfo = isItFilled.nome !== "" || isItFilled.cpf !== "";
      if (buyerHasInfo) {
        const confirmed = window.confirm(
          "Realmente quer desmarcar esse assento?"
        );
        if (confirmed) {
          const newSelectedList = selected.filter(
            (oldSeat) => oldSeat.idAssento !== seat.id
          );
          setSelected(newSelectedList);
          setBuyerInfo((prevBuyerInfo) => {
            return {
              ...prevBuyerInfo,
              ids: newSelectedList.map((seat) => seat.idAssento),
              compradores: prevBuyerInfo.compradores.filter(
                (buyer) => buyer.idAssento !== seat.id
              ),
            };
          });
        }
      } else {
        const newSelectedList = selected.filter(
          (oldSeat) => oldSeat.idAssento !== seat.id
        );
        setSelected(newSelectedList);
        setBuyerInfo((prevBuyerInfo) => {
          return {
            ...prevBuyerInfo,
            ids: newSelectedList.map((seat) => seat.idAssento),
            compradores: prevBuyerInfo.compradores.filter(
              (buyer) => buyer.idAssento !== seat.id
            ),
          };
        });
      }
    } else {
      setSelected([...selected, { idAssento: seat.id, name: seat.name }]);
      setBuyerInfo((prevBuyerInfo) => {
        return {
          ...prevBuyerInfo,
          ids: [...prevBuyerInfo.ids, seat.id],
          compradores: [
            ...prevBuyerInfo.compradores,
            { idAssento: seat.id, nome: "", cpf: "" },
          ],
        };
      });
    }
  }

  function handleSubmit(event, id) {
    const { name, value } = event.target;
    setBuyerInfo((prevBuyerInfo) => {
      const newBuyerInfo = { ...prevBuyerInfo };
      newBuyerInfo.compradores = newBuyerInfo.compradores.map((comprador) => {
        if (comprador.idAssento === id) {
          return { ...comprador, [name]: value };
        } else {
          return comprador;
        }
      });
      return newBuyerInfo;
    });
  }

  console.log("cpf", buyerInfo.compradores.nome);
  console.log("buyerINfo", buyerInfo);
  console.log("selected", selected);

  function checkOut(e) {
    e.preventDefault();
    const ids = selected.map((seat) => seat.idAssento);
    const compradores = ids.map((id) => {
      const comprador = buyerInfo.compradores.find(
        (comprador) => comprador.idAssento === id
      );
      return { idAssento: id, nome: comprador.nome, cpf: comprador.cpf };
    });

    const tickets = { ids, compradores };
    console.log("ticket enviado pra api", tickets);
    const ticketInfo = { movie: seatsLists, buyerInfo, selected };
    const promise = axios.post(
      "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many",
      tickets
    );
    promise.then(() => navigate("/sucesso", { state: { ticketInfo } }));
    promise.catch((err) => alert(err.response.data.message));
  }

  if (seatsLists === undefined) {
    return <div>Carregando lista de assentos...</div>;
  }

  return (
    <PageContainer>
      Selecione o(s) assento(s)
      <SeatsContainer>
        {seatsLists.seats.map((seat) => {
          return (
            <SeatItem
              data-test="seat"
              key={seat.id}
              isAvailable={seat.isAvailable}
              isItSelected={selected.some(
                (seatChosen) => seatChosen.idAssento === seat.id
              )}
              onClick={() => selectSeat(seat)}
            >
              {seat.name}
            </SeatItem>
          );
        })}
      </SeatsContainer>
      <CaptionContainer>
        {captionCirclesList.map((caption) => (
          <CaptionCircles key={caption.name} name={caption.name} />
        ))}
      </CaptionContainer>
      <FormContainer onSubmit={checkOut}>
        {selected.map(({ name: nome, idAssento: idAssento }) => (
          <Seats
            key={idAssento}
            buyerInfo={buyerInfo}
            selected={selected}
            name={nome}
            handleSubmit={(event) => handleSubmit(event, idAssento)}
          />
        ))}
        <button
          data-test="book-seat-btn"
          disabled={selected.length <= 0 ? true : false}
        >
          Reservar Assento(s)
        </button>
      </FormContainer>
      <Footer
        image={seatsLists.movie.posterURL}
        title={seatsLists.movie.title}
        day={seatsLists.day.weekday}
        time={seatsLists.name}
      />
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
  padding-bottom: 120px;
  padding-top: 70px;
`;
const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;

const SeatItem = styled.div`
  border: 1px solid
    ${({ isAvailable, isItSelected }) =>
      isItSelected
        ? selectedSeatBorder
        : isAvailable
        ? availableSeatBorder
        : unavailableSeatBorder}; // Essa cor deve mudar
  background-color: ${({ isAvailable, isItSelected }) =>
    isItSelected
      ? selectedSeatBG
      : isAvailable
      ? availableSeatBG
      : unavailableSeatBG}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
