import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import PurchaseInfo from "./componentsSucessPage/PurchaseInfo";

export default function SuccessPage() {
  const location = useLocation();
  const ticketInfo = location.state.ticketInfo;
  console.log(ticketInfo);
  return (
    <PageContainer>
      <h1>
        Pedido feito <br /> com sucesso!
      </h1>
      <PurchaseInfo ticketInfo={ticketInfo} />
      <Link to="/" data-test="go-home-btn">
        <button>Voltar para Home</button>
      </Link>
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  color: #293845;
  margin: 30px 20px;
  padding-bottom: 120px;
  padding-top: 70px;
  a {
    text-decoration: none;
  }
  button {
    margin-top: 50px;
  }
  h1 {
    font-family: "Roboto";
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 28px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #247a6b;
  }
`;
