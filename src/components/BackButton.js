import { useLocation, useNavigate } from "react-router-dom"
import styled from "styled-components"

export default function Button() {
    const location = useLocation();
    const navigate = useNavigate();
    return(
        location.pathname !== '/' && (
        <ContainerButton onClick={() => navigate(-1)} data-test="go-home-header-btn">
            <ion-icon name="arrow-back-outline"></ion-icon>
            </ContainerButton>
    )
    )
}

const ContainerButton = styled.div`
display:flex;
position:fixed;
left: 10px;
z-index: 1;
    ion-icon {
    color:#000;
}
`