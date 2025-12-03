interface CardData {
    nome: string
    localizacao: string
    setor: string
    anoTermo: string
    anoAlvo: string
}

interface CardProps{
    data: CardData
}

const ListarEmpresas = ({data}: CardProps) => {

    return(
        <div className="d-flex justify-content-center">
            <div className="card" style={{width: "20rem"}}>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.nome}
                    </h2>
                    <h5>{data.localizacao}</h5>
                    <h5>{data.setor}</h5>
                    <h5>{data.anoTermo}</h5>
                    <h5>{data.anoAlvo}</h5>
                </div>
            </div>
        </div>
    )
}
export default ListarEmpresas