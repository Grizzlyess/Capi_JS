import React from 'react'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import ListarEmpresas from './pages/ListarEmpresas'
import "./App.css"

function App() {

  return (
    <>
      <HomePage />
      <Login/>
      <ListarEmpresas data={{
        nome: "teste",
        localizacao: "Brasil",
        setor: "Tecnologia",
        anoTermo: "2020",
        anoAlvo: "2024"
  }}/>
    </>
  )
}

export default App