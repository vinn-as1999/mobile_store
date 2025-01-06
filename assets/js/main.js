import { categories } from "./categories.js";



// dark mode
function changeMode() {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark') {
        document.body.classList.remove('dark');
        document.body.classList.add('light');
        localStorage.setItem('theme', 'light');

    } else {
        document.body.classList.remove('light');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
};


// função que exibe os novos produtos
function featuringProducts(number) {
    const featuring = document.getElementById('feat-display');

    if (!featuring) return;
    
    if (number === undefined) number = 0;

    const [prod1, prod2, prod3] = [
        categories.iPhone[0], 
        categories.ASUS[1], 
        categories.Samsung[1]
    ];

    const list = [prod1, prod2, prod3];
    const visibleProduct = list[number];

    const newElement = document.createElement('article');
    const img = document.createElement('img');
    const title = document.createElement('h2');
    const div = document.createElement('div');
    const leftV = document.querySelector('.arrow-left');
    const rightV = document.querySelector('.arrow-right');
    const button = document.createElement('button');

    newElement.classList.add('featuring-product');
    img.src = visibleProduct.image;
    title.innerText = visibleProduct.name;
    div.innerText = `R$ ${visibleProduct.price}`;
    button.innerText = 'COMPRAR'

    newElement.append(img, title, div, button);
    featuring.innerHTML = '';
    featuring.append(newElement);

    leftV.addEventListener('click', () => {
        number = (number - 1 + list.length) % list.length;
        featuringProducts(number);
    });

    rightV.addEventListener('click', () => {
        number = (number + 1) % list.length;
        featuringProducts(number);
    });
};


// função que exibe os produtos
function displayCategories() {
    const products = Object.keys(categories);

    for (let cat in products) {
        const div = document.createElement('div');
        div.innerText = String(products[cat]);
        
    }
};


function createElements(item) {
    const existingProducts = document.querySelector('.existing-products');
    const article = document.createElement('article');
    const div1 = document.createElement('div');
    div1.classList.add('list-prod');
    const img = document.createElement('img');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const button = document.createElement('button');

    button.addEventListener('click', () => {
        localStorage.setItem('selected', JSON.stringify(item))
        window.location.href = 'shopping.html'
    });

    img.src = item.image;
    img.title = item.name;
    div2.innerText = `R$ ${item.price}`;
    button.innerText = 'COMPRAR';

    div1.append(img, div2);
    div3.appendChild(button);
    article.append(div1, div3);

    existingProducts.appendChild(article);
};


// mostra os produtos na tela
function displayProducts() {
    const existingProducts = document.querySelector('.existing-products');
    if (!existingProducts) return;

    existingProducts.innerHTML = '';

    Object.keys(categories).forEach(key => {
        for (let item of categories[key]) {
            createElements(item)
        }
    });
};



function displaySelected() {
    const selected = JSON.parse(localStorage.getItem('selected'));
    const img = document.querySelector('.selected-img');
    const info = document.querySelector('.selected-info');
    const details = document.querySelector('.details');

    if (!img || !info || !selected) return;

    img.innerHTML = `
        <article class="sel-container">
            <div class="sel-img">
                <h1 class="prod-name">${selected.name}</h1>
                <img src="${selected.image}">
            </div>
        </article>
    `

    info.innerHTML = `
        <article>
            <div>
                <div class="true-price">R$ ${selected.price + 500}</div>
                <div class="new-price">R$ ${selected.price}</div>
            </div>
            <div class="division"></div>
            <div class="last-info">
                <i class="fa-regular fa-circle-check"></i>
                Garantia de 6 meses!
            </div>
            <div class="last-info">
                <i class="fa-regular fa-circle-check"></i>
                Parcele em até 18x s/ juros!
            </div>
        </article>
    `

    details.innerHTML = `
        <article>
            <h1>Detalhes Gerais</h1>
            <div class="dscpt">
                ${selected.description}
            </div>
            <div class="inputs">
                <select class="sel-gigabyte">
                    <option disabled selected>Definir Gigabyte</option>
                    <option>64 GB</option>
                    <option>128 GB</option>
                    <option>512 GB</option>
                </select>
                <select class="sel-color">
                    <option disabled selected>Escolha a cor</option>
                    <option>Branco</option>
                    <option>Magenta</option>
                    <option>Turquesa</option>
                    <option>Cerúleo</option>
                    <option>Preto</option>
                </select>
                <div class="buy">
                    <input type="number" min="1" max="5" value="1">
                    <button>COMPRAR</button>
                </div>
            </div>
        </article>
    `
};



function displaySearch() {
    const input = document.querySelector('#search-prod');
    const existingProducts = document.querySelector('.existing-products');
    if (!input || !existingProducts) return;

    input.addEventListener('input', event => {
        const inputValue = event.target.value.toLowerCase();

        existingProducts.innerHTML = '';

        const list = Object.keys(categories).flatMap(brand => {
            return categories[brand].filter(product => 
                product.name.toLowerCase().includes(inputValue)
            );
        });

        for (let item of list) {
            createElements(item)
        }
    });
};




window.changeMode = changeMode;

window.onload = () => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(theme);
};

document.addEventListener('DOMContentLoaded', () => {
    displayCategories();
    displayProducts();
    displaySelected();
    displaySearch();
    featuringProducts();
});

