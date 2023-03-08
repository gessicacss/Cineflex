import styled from "styled-components"

export default function Footer({sectionChoosed}){
    return (
        <FooterContainer data-test="footer" sectionChoosed={sectionChoosed}>
        <div>
            <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
        </div>
        <div>
            <p>Tudo em todo lugar ao mesmo tempo</p>
            {sectionChoosed && 
            <p>Sexta - 14h00</p>}
        </div>
    </FooterContainer>
    )
}

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        ${({sectionChoosed}) => !sectionChoosed && 'margin-bottom:20px;'}
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`