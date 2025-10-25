interface BSProps {
    titulo: string
}

function BarraSuperior({titulo}:BSProps) {
    return(
        <header className="container-fluid barra-superior">
            <p>{titulo}</p>
        </header>
    )
}

export default BarraSuperior