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
  G) Geral Refatorar o código CSS, revisar a arquitetura;
*/

//Elementos HTML

const Main = {
  init: function () {
    this.cacheSelectors()
    this.bindEvents()
    this.Events.addMoreProducts_click()
  },

  cacheSelectors: function () {
    this.containerProduct = document.querySelector('.containerProduct')
    this.addMoreProducts = document.querySelector('.addMoreProducts')
    this.mainTitle = document.querySelector('main .title')
  },

  bindEvents: function () {
    this.addMoreProducts.onclick = this.Events.addMoreProducts_click
  },

  numberPage: 1,

  Events: {
    addMoreProducts_click: function apiConnect () {
      page = Main.numberPage++
  
      let url ='https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=' + page

      configs = {
        method: 'GET',
        header: {}
      }

      function transformToJson (response) {
        return response.json()
      }

      function showInScreen (dados) {
        products = dados.products
  
        for (let product of products) {
          Main.containerProduct.innerHTML += `<div class="product" id="${
            product.id
          }">
                <img src="${product.image}" alt="product Image">
                <h4>${product.name}</h4>
                <p>
                  ${product.description}
                </p>
                <span id="from">
                  De: ${product.oldPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
                <span id="by">
                  Por: ${product.price.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  })}
                </span>
                <span id="or">
                  ou ${
                    product.installments.count
                  }x de ${product.installments.value.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          })}
                  </span>
                <button class="btnBuy">Comprar</button>
              </div>`
        }
      }

      function showError (error) {
        console.log('Oh no!, this is a error!,' + error)
        Main.mainTitle.innerHTML = `<h2>Erro ao carregar os produtos</h2>`
      }

      console.log('url final: ' + url + ', page: ' + page)

      fetch(url, configs)
        .then(transformToJson)
        .then(showInScreen)
        .catch(showError)
    }
  }
}

Main.init()
