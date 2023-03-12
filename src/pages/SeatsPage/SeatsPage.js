import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CaptionCircles from "../../components/CaptionCircle";
import Footer from "../../components/Footer";
import {PageContainer, SeatsContainer, FormContainer, CaptionContainer, SeatItem} from './styled'
import captionCirclesList from "../../constants/captionCirclesList";
import Seats from "./componentsSeatsPage/Seats";

export default function SeatsPage() {
  const { idSession } = useParams();
  const [seatsLists, setseatsLists] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [buyerInfo, setBuyerInfo] = useState({ compradores: [] });
  const [error, setError] = useState('');
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

  function removeSeat(seat) {
    const newSelectedList = selected.filter(
      (oldSeat) => oldSeat.idAssento !== seat.id
    );
    setSelected(newSelectedList);
    setBuyerInfo((prevBuyerInfo) => {
      return {
        ...prevBuyerInfo,
        compradores: prevBuyerInfo.compradores.filter(
          (buyer) => buyer.idAssento !== seat.id
        ),
      };
    });
  }

  function selectSeat(seat) {
    if (seat.isAvailable === false) {
      alert("Esse assento não está disponível");
      return;
    }

    const isItSelected = selected.some(
      (seatChosen) => seatChosen.idAssento === seat.id
    );

    if (isItSelected) {
      const isItFilled = buyerInfo.compradores.find(
        (oldSeat) => oldSeat.idAssento === seat.id
      );
      const buyerHasInfo = isItFilled.nome !== "" || isItFilled.cpf !== "";
      if (buyerHasInfo) {
        const confirmed = window.confirm(
          "Realmente quer desmarcar esse assento?"
        );
        if (!confirmed) {
          return;
        }
        removeSeat(seat);
      }
      removeSeat(seat);
    } else {
      setSelected([...selected, { idAssento: seat.id, name: seat.name }]);
      setBuyerInfo((prevBuyerInfo) => {
        return {
          ...prevBuyerInfo,
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

  function checkOut(e) {
    e.preventDefault();
    const cpfList = buyerInfo.compradores.map((comprador) => comprador.cpf);
    const CpfChar = 11;
    const hasEmptyCpf = cpfList.some((cpf) => cpf.length !== CpfChar);
    if (hasEmptyCpf) {
      setError("O campo CPF deve ter exatamente 11 caracteres.");
      return;
    }
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
        {selected.map(({ name: nome, idAssento }) => (
          <Seats
            key={idAssento}
            buyerInfo={buyerInfo}
            selected={selected}
            name={nome}
            handleSubmit={(event) => handleSubmit(event, idAssento)}
            error={error}
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