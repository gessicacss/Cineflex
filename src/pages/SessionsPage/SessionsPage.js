import styled from "styled-components"
import Footer from "../../components/Footer"

export default function SessionsPage({sectionChoosed}) {

    return (
        <PageContainer>
            Selecione o horário
            <div>
                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>

                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>

                <SessionContainer>
                    Sexta - 03/03/2023
                    <ButtonsContainer>
                        <button>14:00</button>
                        <button>15:00</button>
                    </ButtonsContainer>
                </SessionContainer>
            </div>

            <Footer sectionChoosed={sectionChoosed} />

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
    }
`