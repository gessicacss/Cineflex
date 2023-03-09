import styled from "styled-components";
import { selectedSeatBG, selectedSeatBorder, availableSeatBG, availableSeatBorder, unavailableSeatBG, unavailableSeatBorder } from "../constants/color";

export default function CaptionCircles({name}) {
  return (
    <CaptionItem>
      <CaptionCircle status={name} />
      {name}
    </CaptionItem>
  );
}

const CaptionCircle = styled.div`
  border: 1px solid ${({status}) => status === 'Selecionado' ? selectedSeatBorder : status === 'Disponivel' ? availableSeatBorder : unavailableSeatBorder }; // Essa cor deve mudar
  background-color: ${({status}) => status === 'Selecionado' ? selectedSeatBG : status === 'Disponivel' ? availableSeatBG : unavailableSeatBG }; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;
const CaptionItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
`;
