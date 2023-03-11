import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { HiArrowLeft } from "react-icons/hi";
import { IconContext } from "react-icons";

export default function Button() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    location.pathname !== "/" && (
      <ContainerButton
        onClick={() => navigate(-1)}
        data-test="go-home-header-btn"
      >
        <IconContext.Provider value={{ color: "black", size: "30px" }}>
          <HiArrowLeft />
        </IconContext.Provider>
      </ContainerButton>
    )
  );
}

const ContainerButton = styled.div`
  display: flex;
  position: fixed;
  left: 10px;
  z-index: 1;
  ion-icon {
    color: #000;
  }
`;
