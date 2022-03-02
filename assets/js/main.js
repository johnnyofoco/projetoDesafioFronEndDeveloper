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

      fetch(url, configs)
        .then(transformToJson)
        .then(showInScreen)
        .catch(showError)
    }
  }
}

Main.init()
