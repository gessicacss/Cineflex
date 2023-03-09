import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Footer from "../../components/Footer"

export default function SessionsPage() {
    const { idMovie } = useParams();
    const [sessionsList, setSessionsList] = useState([]);
    const [sessionListTwo, setSessionsListTwo] = useState([]);

    useEffect((() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`);
        promise.then((res) => {
        setSessionsList(res.data);
        setSessionsListTwo(res.data.days);
        console.log(sessionsList);
        })
        promise.catch(err => console.log(err.response.data))
    }
    ),[])

    console.log(sessionsList);


    if (sessionsList === undefined) {
        return <div>Carregando horários das sessões...</div>
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
            {sessionListTwo.map(data =>
                {
                return (
                <SessionContainer>
                {data.weekday} - {data.date}
                <ButtonsContainer>
                {data.showtimes.map((hour) => 
                <button>
                    <Link to={`/assentos/${hour.id}`}>{hour.name}</Link></button>)}
                </ButtonsContainer>
              </SessionContainer>
              )}
            )}
            </div>
            <Footer image={sessionsList.posterURL} title={sessionsList.title}/>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
    }
    a {
        text-decoration: none;
        color: #293845;
    }
`