<H1 align ="center" > DSM-G06-PI3-2024-1 - Robotics Atendimentos 🤖  </h1>

## Descrição do Projeto 📝
Este repositório contém o projeto desenvolvido pelo GRUPO 06 para o Projeto Interdisciplinar do 3º semestre do curso de Desenvolvimento de Software Multiplataforma (DSM) em 2024/1. O projeto "Robotics Atendimentos" visa solucionar o problema da auxência de registros de atendimentos de uma equipe de suporte técnico, permitindo a otimização dos processos e a melhoria da gestão.


## Equipe 👥
* **- [Dimerson Vicente Ferreira](https://www.linkedin.com/in/dimerson-ferreira/): Responsável pelo banco de dados (MongoDB) e design do sistema.**
* **- [Eduardo Vilas Boas Freitas](https://www.linkedin.com/in/eduardo-vilas-boas-062942204/): Desenvolvedor do frontend e responsável pela documentação.**
* **- [Rafael Verissimo da Silva](https://www.linkedin.com/in/rafael-ver%C3%ADssimo-da-silva-94a674227/): Desenvolvedor do backend e Product Owner (PO).**


## Tecnologias Utilizadas 🚀
* **Frontend: Next.js (React Framework) ⚛️**
* **Backend: Node.js com Express.js 🖥️**
* **Banco de Dados: MongoDB (NoSQL Database) 🍃**


## Funcionalidades Principais ✨
* **Registro de Atendimentos e Chamados:** Permite o registro eletrônico de todos os atendimentos e chamados realizados pela equipe de TI.
* **Categorização de Problemas:** Classifica os tickets por categorias predefinidas (Hardware, Software, Rede, etc.).
* **Acompanhamento do Status dos Tickets:** Monitora o progresso dos tickets, desde a abertura até o fechamento.


## Documentação da API 📖
A documentação completa da API REST utilizada neste projeto, incluindo exemplos de requisições e respostas, pode ser encontrada em:
[DOCUMENTAÇÃO-API-GP-06](https://documenter.getpostman.com/view/34861590/2sA3XMhN9m)


## Como Executar o Projeto local ▶️

**Clonar o Repositório:**
```
Bash

git clone https://github.com/FatecFranca/DSM-G06-PI3-2024-1.git
```

**Instalar as Dependências (Frontend e Backend):**
```
Bash
cd client
npm install
cd ../server
npm install
```

## Configurar o MongoDB:

Certifique-se de ter o MongoDB instalado e em execução.
Crie um banco de dados chamado robotics-atendimentos.
Crie um arquivo .env na raiz do diretório do backend e adicione a seguinte linha:

```
DATABASE_URL=mongodb://localhost:27017/robotics-atendimentos
//(Substitua localhost e 27017 pelos valores corretos se o seu MongoDB estiver em outro host ou porta)
```

## Iniciar o servidor 🗄️
```
cd server/
npm start
```

## Iniciar o aplicativo 📱
```
cd ../client
npm run dev
```

## Screenshots 📸
* **Tela de login**
![image](https://github.com/FatecFranca/DSM-G06-PI3-2024-1/assets/111711287/24175202-a2de-44e2-9fb5-84e345389a03)

* **Tela de tickets**
![image](https://github.com/FatecFranca/DSM-G06-PI3-2024-1/assets/111711287/d43d000a-e5d9-471d-b666-62e331bf62bf)

* **Tela de abertura de ticket**
![image](https://github.com/FatecFranca/DSM-G06-PI3-2024-1/assets/111711287/b7961278-9c7c-43c6-b285-04da96bc4cbf)

* **Tela de edição de ticket**
![image](https://github.com/FatecFranca/DSM-G06-PI3-2024-1/assets/111711287/e1c44a0b-feeb-4b91-a775-5c8c3ad1c90b)




## Contribuições 🤝
Contribuições são bem-vindas!

## Licença 📄

**Este projeto está licenciado sob a [Licença MIT].**
