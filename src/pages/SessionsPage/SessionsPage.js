import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../components/Footer";
import Sessions from "../../components/Sessions";

export default function SessionsPage() {
  const { idMovie } = useParams();
  const [sessionsList, setSessionsList] = useState(undefined);

  useEffect(() => {
    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`
    );
    promise.then((res) => {
      setSessionsList(res.data);
    });
    promise.catch((err) => alert(err.response.data.message));
  }, [idMovie]);

  console.log(sessionsList);

  if (sessionsList === undefined) {
    return <div>Carregando horários das sessões...</div>;
  }

  return (
    <PageContainer>
      Selecione o horário
      <div>
        {sessionsList.days.map((data) => {
          return (
            <Sessions
              date={data.date}
              key={data.id}
              weekday={data.weekday}
              showtimes={data.showtimes}
            />
          );
        })}
      </div>
      <Footer image={sessionsList.posterURL} title={sessionsList.title} />
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
  div {
    margin-top: 20px;
  }
`;
