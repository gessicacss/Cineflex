import { Link } from "react-router-dom"
import styled from "styled-components"

export default function Movies({src, alt, id}){
    return (
        <Link to={`/sessoes/37/${id}`}>
        <MovieContainer data-test="movie">
        <img src={src} alt={alt}/>
        </MovieContainer>
        </Link>
    )
}

const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
    &&:hover {
            filter: brightness(35%);
            transition: filter 0.2s ease-in-out;
        }
`