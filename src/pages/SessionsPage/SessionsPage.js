import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"
import Footer from "../../components/Footer"

export default function SessionsPage() {
    const { idMovie } = useParams();
    const [sessionsList, setSessionsList] = useState(undefined);

    useEffect((() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idMovie}/showtimes`);
        promise.then((res) => {
        setSessionsList(res.data);
        })
        promise.catch(err =>  alert((`Ocorreu um erro carregando as sessões, favor recarregar a página`)))
    }
    ),[idMovie])

    console.log(sessionsList);


    if (sessionsList === undefined) {
        return <div>Carregando horários das sessões...</div>
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {sessionsList.days.map(data =>
                    {
                    return (
                    <SessionContainer key={data.id} data-test="movie-day">
                    {data.weekday} - {data.date}
                    <ButtonsContainer>
                    {data.showtimes.map((hour) => 
                    <Link to={`/assentos/${hour.id}`}>
                    <button key={hour.id} data-test="showtime">
                    {hour.name}</button></Link>)}
                    </ButtonsContainer>
                </SessionContainer>
                )})
                }
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
        cursor:pointer;
    }
    a {
        text-decoration: none;
        color: #293845;
    }
`