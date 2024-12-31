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


function featuringProducts(number) {
    const featuring = document.getElementById('featuring');
    
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
    const button = document.createElement('button');
    const leftV = document.createElement('div');
    const rightV = document.createElement('div');

    newElement.classList.add('featuring-product');
    img.src = visibleProduct.image;
    title.innerText = visibleProduct.name;
    div.innerText = `R$ ${visibleProduct.price}`;
    button.innerText = 'COMPRAR';

    leftV.innerHTML = `
        <svg class="arrow-left" xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24"><path d="M17.815 4.843L5.888 12l11.927 7.157-2.982-7.157 2.982-7.157zm4.185-4.843l-5 12 5 12-20-12 20-12z"/></svg>`;
    
    rightV.innerHTML = `
        <svg class="arrow-right" xmlns="http://www.w3.org/2000/svg" width="54" height="54" viewBox="0 0 24 24"><path d="M6.185 4.843l11.927 7.157-11.927 7.157 2.982-7.157-2.982-7.157zm-4.185-4.843l5 12-5 12 20-12-20-12z"/></svg>`;

    newElement.append(img, title, div, button);
    featuring.innerHTML = '';
    featuring.append(leftV, newElement, rightV);

    leftV.addEventListener('click', () => {
        number = (number - 1 + list.length) % list.length;
        featuringProducts(number);
    });

    rightV.addEventListener('click', () => {
        number = (number + 1) % list.length;
        featuringProducts(number);
    });
}



window.changeMode = changeMode;

window.onload = () => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(theme);
};

document.addEventListener('DOMContentLoaded', () => {
    featuringProducts();
});

