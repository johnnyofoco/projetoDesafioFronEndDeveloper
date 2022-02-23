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
  C) Trabalhar na validação dos forms;
  D) Criar o metódo que realizará a conexão para consumir a API;
  F) Criar o metódo/função que escreve dinamicamente os elementos do containerProduct (tantos os iniciais como os  demais);
*/

//Elementos HTML
const containerProduct = document.querySelector('.containerProduct')
const addMoreProducts = document.querySelector('.addMoreProducts')

//Funções:

/*########################################################*/

//Função para carregar + 8 produtos:
function loadProducts() {
  //Funções para tratar o retorno da API
  function transformToJson (response) {
    return response.json()
  }

  function exibirNaTela(dados) {
    
    console.log(dados)
  }
  function exibirErro (dados) {
    console.log('Ops, deu erro!')
    const mainTitle = document.querySelector('main .title')
    mainTitle.innerHTML += `<h2>Erro ao carregar os produtos</h2>`
  }

  //Trecho referente a conexão da API 
  const configs = {
    method: 'GET',
    header: {}
  }

  const url = 'https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1'


  fetch(url,configs)
    .then(transformToJson)
    .then(exibirNaTela)
    .catch(exibirErro)

  /*
  for (let index = 0; index < 8; index++) {
    console.log('cheguei aqui...')
    containerProduct.innerHTML += `<div class="product">
                    <img src="src/images/imgProductExample.png" alt="product Image">
                    <h4>Nome do produto</h4>
                    <p>
                      Descrição do produto um pouco maior, com duas linhas ou três que explica melhor do que se trata.
                    </p>
                    <span id="from">De: R$23,99</span>
                    <span id="by">Por: R$19,99</span>
                    <span id="or">ou 2x de R$9,99</span>
                    <button class="btnBuy">Comprar</button>
                </div>
                `
    console.log('passei por aqui. tbm..')
  }*/
}

//Listner´s
addMoreProducts.addEventListener('click', loadProducts)

//Bloco principal de execução:
loadProducts() //Inicializa a página com 8 produtos
