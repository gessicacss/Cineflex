export default function Seats({selected, buyerInfo, handleSubmit, name}){
    return (
        <div>
       <label>Nome do Comprador {name}:
        <input
        id="name"
        data-test="client-name"
        name={"nome"}
        required
        type="text"
        value={buyerInfo.name}
        disabled={selected.length <= 0 ? true : false}
        onChange={handleSubmit}
        placeholder="Digite seu nome..."
        />
        </label>

        <label>CPF do Comprador {name}:
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
        </label>
        </div>
    )
}