<h1 align="center">Ecommerce made with Next.js</h1>

<p align="center">	
   <a href="https://www.linkedin.com/in/rafael-goulartb/">
      <img alt="Rafael Goulart" src="https://img.shields.io/badge/-RafaelGoulartB-03B0E8?style=flat&logo=Linkedin&logoColor=white" />
   </a>
  <a href="https://github.com/RafaelGoulartB/next-ecommerce#readme">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-03B0E8.svg" target="_blank" />
  </a>
  <a href="https://github.com/RafaelGoulartB/next-ecommerce/graphs/commit-activity">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-03B0E8.svg" target="_blank" />
  </a>
  <a href="https://github.com/RafaelGoulartB/next-ecommerce/blob/master/LICENSE">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-03B0E8.svg" target="_blank" />
  </a>
  <img alt="GitHub Pull Requests" src="https://img.shields.io/github/issues-pr/RafaelGoulartB/next-ecommerce?color=03B0E8" />
  <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/RafaelGoulartB/next-ecommerce?color=03B0E8" />
  <img alt="" src="https://img.shields.io/github/repo-size/RafaelGoulartB/next-ecommerce?color=03B0E8" />
</p>

> This project was made to show a full ecommerce plataform made with Next.js and Nextjs Serverless functions to build the backend, using Apollo Server and Apollo Client to GraphQL.

<p align="center">
    <a href="README.md">English</a>
    ·
    <a href="README-pt.md">Portuguese</a>
 </p>

<div align="center">
  <sub>The ecommerce project. Built with ❤︎ by
    <a href="https://github.com/RafaelGoulartB">Rafael Goulart</a> and
    <a href="https://github.com/RafaelGoulartB/next-ecommerce/graphs/contributors">
      contributors
    </a>
  </sub>
</div>

<br />
<div align="center">
  <img src="https://github.com/RafaelGoulartB/Ecommerce-Quantum/blob/master/Ecommerce.jpg" width="720">
</div>

---

# :pushpin: Table of Contents

* [Demo Website](#eyes-demo-website)
* [Technologies](#computer-technologies)
* [Features](#rocket-features)
* [How to run](#construction_worker-how-to-run)
* [Found a bug? Missing a specific feature?](#bug-issues)
* [Contributing](#tada-contributing)
* [License](#closed_book-license)

<h2 align="left"> 📥 Layout available at: </h2>
<p align="center">
    <a title="Acess Figma Web" href="https://www.figma.com/file/fDLkOXAz4k3ILWb8PoDivJZF/E-Commerce-Quantum?node-id=0%3A1">
        <img alt="Direct Download" src="https://img.shields.io/badge/Acess Figma Web-black?style=flat-square&logo=figma&logoColor=red" width="200px" />
    </a>
</p>

# :eyes: Demo Website
The demo website can be missing some features, clone and run the project to a full experience. <br>
👉  demo: https://quantum-ecommerce.now.sh/

# :computer: Technologies
This project was made using the follow technologies:

* [Next.js](https://nextjs.org/) - To SSR and routes control     
* [GraphQL](https://graphql.org/) - To query language     
* [Apollo](https://www.apollographql.com/) - To graphql server and client       
* [Knex](https://knexjs.org/) - ORM   
* [Vercel](https://vercel.com/) - To deploy website     

# :rocket: Features

- Authentication with Cookies Sessions.
- Reset Password using email
- List Products
- Filter products by Category
- Sort list of products
- Live search
- Add products to Wishlist
- Add products to Cart
- Checkout page
- Payment with Paypal
- Review Products
  
# :construction_worker: How to run
**You need to install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/) first, then:**

### Rename env file
Rename `.env.local-exemple` to `.env.local`
### Install Dependencies
```bash
yarn install
```
### Set up database
```bash
# Create DB using migrations
yarn knex:migrate

# Run seeds to populate database
yarn knex:seed 
```
### Run Aplication
```bash 
yarn dev 
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
<br>
<br>
Open [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql) with your browser to run queries or to see docs of API.


# :bug: Issues

Feel free to **file a new issue** with a respective title and description on the the [NextJS Ecommerce](https://github.com/RafaelGoulartB/next-ecommerce/issues) repository. If you already found a solution to your problem, **i would love to review your pull request**!


---


[⬆ Voltar ao topo](#pushpin-table-of-contents)



# :tada: Contributing
First of all, thank you for being interested in helping out, your time is always appreciated in every way. :100:

Here's some tips:

* Check the [issues page](https://github.com/RafaelGoulartB/next-ecommerce/issues) for already opened issues (or maybe even closed ones) that might already address your question/bug/feature request.
* Feature requests are welcomed! Provide some details on why it would be helpful for you and others, explain how you're using bull-board and if possible even some screenshots if you are willing to mock something!

Check out the [contributing](./CONTRIBUTING.md) page to see the best places to file issues, start discussions and begin contributing.

# :closed_book: License

Released in 2020.
This project is under the [MIT license](./LICENSE).

Made with love by [RafaelGoulartB](https://github.com/RafaelGoulartB) 🚀
