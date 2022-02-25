/*
  Objetivo: fazer que a classe/div products seja criada dinamicamente:
  -Inicialmente 8 produtos são carregados utilizando a api;
  -Após o usuário clicar em ainda mais produtos, deve ser criado em main + 1 div/container: containerProduct added 
   com mais 8 produtos (8 classe/div products);
/*

/*
  PENDÊNCIAS:
  FEITO! A) Carregar os elementos HTML;
  FEITO! B) Criar o(s) evento(s) listner(s);
  FEITO! C) Criar o metódo que realizará a conexão para consumir a API;
  FEITO! D) Criar o metódo/função que escreve dinamicamente os elementos do containerProduct (tantos os iniciais como os  demais);
  E) javaScript Trabalhar na validação dos forms;
  F) CSS Construir a versão responsiva para Mobile;
  G) Geral Refatorar o código CSS, javaScript e revisar a arquitetura;
*/

//Elementos HTML
const containerProduct = document.querySelector('.containerProduct')
const addMoreProducts = document.querySelector('.addMoreProducts')
let numberPage = 1
let url = 'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=' + numberPage
const configs = {
  method: 'GET',
  header: {}
}

let firstLoad = false

//Funções:
/*########################################################*/

//Função para carregar + 8 produtos:
function loadProducts () {
  firstLoad = true

  //Funções para tratar o retorno da API
  function transformToJson (response) {
    return response.json()
  }

  function exibirNaTela(dados) {
    
    let products = dados.products
    let nextPage = dados.nextPage

    url = 'https://' + nextPage

    for (let product of products) {
      
      containerProduct
        .innerHTML += `<div class="product" id="${product.id}">
                          <img src="${product.image}" alt="product Image">
                          <h4>${product.name}</h4>
                          <p>
                            ${product.description}
                          </p>
                          <span id="from">
                            De: ${product.oldPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                          </span>
                          <span id="by">
                            Por: ${product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                          </span>
                          <span id="or">
                            ou ${product.installments.count}x de ${product.installments.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </span>
                          <button class="btnBuy">Comprar</button>
                        </div>
                        `
    }
  }

  function exibirErro (error) {
    console.log('Ops, deu erro! ' + error)
    const mainTitle = document.querySelector('main .title')
    mainTitle.innerHTML = `<h2>Erro ao carregar os produtos</h2>`
  }

  //Trecho referente a conexão da API
  fetch(url, configs)
    .then(transformToJson)
    .then(exibirNaTela)
    .catch(exibirErro)
}

//Listner´s
addMoreProducts.addEventListener('click', loadProducts)

//Bloco principal de execução:
loadProducts() //Inicializa a página com 8 produtos
