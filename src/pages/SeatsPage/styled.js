import styled from "styled-components";
import {
    selectedSeatBG,
    selectedSeatBorder,
    availableSeatBG,
    availableSeatBorder,
    unavailableSeatBG,
    unavailableSeatBorder,
  } from "../../constants/color";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Roboto";
  font-size: 24px;
  text-align: center;
  color: #293845;
  margin-top: 30px;
  padding-bottom: 120px;
  padding-top: 70px;
`;
export const SeatsContainer = styled.div`
  width: 330px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
export const FormContainer = styled.form`
  width: calc(100vw - 40px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  font-size: 18px;
  button {
    align-self: center;
  }
  input {
    width: calc(100vw - 60px);
  }
`;
export const CaptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  justify-content: space-between;
  margin: 20px;
`;

export const SeatItem = styled.div`
  border: 1px solid
    ${({ isAvailable, isItSelected }) =>
      isItSelected
        ? selectedSeatBorder
        : isAvailable
        ? availableSeatBorder
        : unavailableSeatBorder}; // Essa cor deve mudar
  background-color: ${({ isAvailable, isItSelected }) =>
    isItSelected
      ? selectedSeatBG
      : isAvailable
      ? availableSeatBG
      : unavailableSeatBG}; // Essa cor deve mudar
  height: 25px;
  width: 25px;
  border-radius: 25px;
  font-family: "Roboto";
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 3px;
`;