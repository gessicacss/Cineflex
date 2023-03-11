export default function Seats({ selected, buyerInfo, handleSubmit, name }) {
  return (
    <>
      <label htmlFor="">Nome do Comprador {name}:</label>
      <input
        id="name"
        data-test="client-name"
        name={"name"}
        required
        type="text"
        value={buyerInfo.name}
        disabled={selected.length <= 0 ? true : false}
        onChange={handleSubmit}
        placeholder="Digite seu nome..."
      />

      <label htmlFor="cpf">CPF do Comprador {name}:</label>
      <input
        id="cpf"
        data-test="client-cpf"
        name={"cpf"}
        required
        type="number"
        value={buyerInfo.cpf}
        onChange={handleSubmit}
        disabled={selected.length <= 0 ? true : false}
        placeholder="Digite seu CPF..."
      />
    </>
  );
}
