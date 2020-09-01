<h1 align="center">ECOMMERCE QUANTUM</h1>

<p align="center">	
   <a href="https://www.linkedin.com/in/rafael-goulartb/">
      <img alt="Rafael Goulart" src="https://img.shields.io/badge/-RafaelGoulartB-03B0E8?style=flat&logo=Linkedin&logoColor=white" />
   </a>
  <a href="https://github.com/RafaelGoulartB/next.js-ecommerce#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-03B0E8.svg" target="_blank" />
  </a>
  <a href="https://github.com/RafaelGoulartB/next.js-ecommerce/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-03B0E8.svg" target="_blank" />
  </a>
  <a href="https://github.com/RafaelGoulartB/next.js-ecommerce/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-03B0E8.svg" target="_blank" />
  </a>
  <img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr/RafaelGoulartB/next.js-ecommerce?color=03B0E8" />
  <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/RafaelGoulartB/next.js-ecommerce?color=03B0E8" />
  <img alt="" src="https://img.shields.io/github/repo-size/RafaelGoulartB/next.js-ecommerce?color=03B0E8" />
</p>

> Esse projeto foi feito para mostrar uma experiencia completa de um ecommerce feito utilizando Next.js e Verce e usando a API do Next.js para a criação do back-end utilizando Apollo e GraphQL.

<p align="center">
    <a href="README.md">Inglês</a>
    ·
    <a href="README-pt.md">Português</a>
 </p>

<div align="center">
  <sub>The ecommerce project. Built with ❤︎ by
    <a href="https://github.com/RafaelGoulartB">Rafael Goulart</a> and
    <a href="https://github.com/RafaelGoulartB/Next.js-Ecommerce/graphs/contributors">
      contributors
    </a>
  </sub>
</div>

# :pushpin: Tabela de Conteúdo

* [Site de Demostração](#eyes-site-de-demostração) 
* [Tecnologias](#computer-tecnologias)
* [Funcionalidades](#rocket-funcionalidades)
* [Como rodar](#construction_worker-como-rodar)
* [Encontrou um bug? Ou está faltando uma feature?](#bug-problemas)
* [Contribuindo](#tada-contribuindo)
* [Licencia](#closed_book-licencia)

## 📥 Layout disponivel para download em:  
<p align="center">
    <a title="Acess Figma Web" href="https://www.figma.com/file/fDLkOXAz4k3ILWb8PoDivJZF/E-Commerce-Quantum?node-id=0%3A1">
        <img alt="Direct Download" src="https://img.shields.io/badge/Acess Figma Web-black?style=flat-square&logo=figma&logoColor=red" width="200px" />
    </a>
</p>

### Screenshots
<div align="center">
  <img src="https://github.com/RafaelGoulartB/Ecommerce-Quantum/blob/master/Ecommerce.jpg" width="580">
</div>


# :eyes: Site de Demostração
No site de demostração pode estar faltando algumas funcionalidades, clene e rode o projeto para uma experiencia completa.    
👉  demo: https://quantum-ecommerce.now.sh/

# :computer: Tecnologias
Esse projeto foi feito utilizando as seguintes tecnologias:

* [Next.js](https://nextjs.org/) - Para o SSR e controle de rotas  
* [GraphQL](https://graphql.org/) - Para linguagem de query     
* [Apollo](https://www.apollographql.com/) - Para o cliente/servidor graphql  
* [Knex](https://knexjs.org/) - ORM   
* [Vercel](https://vercel.com/) - Para hostear o site      

# :rocket: Funcionalidades

- Autenticação com Cookies Sessions.
- Rest password com email
- Listagem de produtos
- Filtrar produtos por categoria
- Ordenar listagem de produtos
- Pesquisa de Produtos
- Adicionar produtos a lista de desejos
- Adicionar produtos ao carinho
- CHeckout com Paypal e MercadoPago
- Pagamento com Paypal e MercadoPago
- Review de Produtos
- Formulario de contato

# :construction_worker: Como rodar
### Renomear arquivo de variaveis de ambiente
Renomear `.env.local-exemple` para `.env.local`
### Instalar Dependencias
```bash
yarn install
```
### Configurar banco de dados
```bash
# Criar DB usando migrations
yarn knex:migrate

# Rodar seeds para popular o banco de dados
yarn knex:seed 
```
### Rodar Aplicação
```bash 
yarn dev 
```
Acesse [http://localhost:3000](http://localhost:3000) para ver o resultado.
<br>
<br>
Acesse [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) para ver a documentação da API.


# :bug: Problemas

Fique a vontade **para criar uma nova issue** com o respectivo titulo e descrição na página de issues do [Next.js Ecommerce](https://github.com/RafaelGoulartB/Next.js-Ecommerce/issues) Repositorio. Se você já encontrou a solução para o problema, **Eu amaria fazer o review do seu pull request**!

# :tada: Contribuindo

Confira a página de [contribuição](./CONTRIBUTING.md) para ver como começar uma discução e começar a contribuir.

# :closed_book: Licencia

Lançado em 2020 :closed_book: Licencia

Made with love by [Rafael Goulart](https://github.com/RafaelGoulartB) 🚀.
Esse projeto esta sobre [MIT license](./LICENSE).


Dê uma ⭐️ se esse projeto te ajudou!
