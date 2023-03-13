import styled from "styled-components";

export default function SeatsForm({
  selected,
  buyerInfo,
  handleSubmit,
  name,
  error,
}) {
  return (
    <div>
      <Container>
      <label>
        Nome do Comprador {name}:
        <input
          id="name"
          data-test="client-name"
          name={"nome"}
          required
          type="text"
          value={buyerInfo.name}
          onChange={handleSubmit}
          placeholder="Digite seu nome..."
        />
      </label>
      </Container>
      <Container>
        <label>
          CPF do Comprador {name}:
          <input
            id="cpf"
            data-test="client-cpf"
            name={"cpf"}
            required
            pattern="[0-9]+$"
            maxLength={11}
            minLength={11}
            value={buyerInfo.cpf}
            onChange={handleSubmit}
            placeholder="Digite seu CPF..."
          />
          {error && <p>{error}</p>}
        </label>
      </Container>
    </div>
  );
}

const Container = styled.div`
  position: relative;
  p {
    position: absolute;
    top: 100%;
    left: 0;
    font-size: 14px;
    color: red;
  }
`;
