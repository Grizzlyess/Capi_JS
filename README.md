# 🌍 CAPI - Plataforma de Sustentabilidade e Pegada de Carbono

## 📖 Sobre o Projeto

O **CAPI** é uma plataforma web desenvolvida para atuar como um diretório de empresas sustentáveis e uma ferramenta interativa para o cálculo da pegada de carbono. O objetivo do sistema é conscientizar usuários e conectar consumidores a negócios que adotam práticas ecológicas. 

O projeto foi submetido a testes com usuários reais utilizando o método **System Usability Scale (SUS)** para garantir a melhor experiência e usabilidade (UI/UX) possível.

🔗 **Acesse a aplicação em produção:** [CAPI no GitHub Pages](https://grizzlyess.github.io/Capi_JS/#/)

## ✨ Funcionalidades

A aplicação é dividida em diversos módulos independentes integrados por uma API RESTful:
* **Cálculo de Pegada de Carbono:** Sistema interativo que avalia o impacto ambiental do usuário.
* **Diretório de Empresas:** Listagem e detalhamento de empresas focadas em sustentabilidade.
* **Gestão de Produtos:** Catálogo de produtos sustentáveis vinculados às empresas.
* **Sistema de Usuários:** Autenticação, perfis e gerenciamento de sessão.
* **Comunicação (Mensagens):** Módulo para envio e recebimento de contatos através da plataforma.

## 🛠️ Tecnologias Utilizadas

O repositório está organizado e construído com as seguintes tecnologias:

### Frontend
* **Build Tool:** Vite
* **Linguagem:** TypeScript
* **Hospedagem:** GitHub Pages

### Backend
* **Ambiente:** Node.js (com Express)
* **ORM:** Prisma
* **Banco de Dados:** MongoDB Atlas
* **Hospedagem:** Render

## 📁 Estrutura do Projeto

O repositório contém ambas as partes da aplicação, separadas em diretórios:
* `/frontend`: Contém toda a interface de usuário (UI) e lógicas de apresentação.
* `/backend`: Contém a API, esquemas do Prisma, rotas (`calculo`, `empresas`, `produtos`, `users`, `mensagens`) e o script de seed inicial (`Empresas.csv`).

