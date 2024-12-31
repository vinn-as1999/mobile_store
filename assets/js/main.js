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
    const featuring = document.getElementById('feat-display');
    
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

    newElement.classList.add('featuring-product');
    img.src = visibleProduct.image;
    title.innerText = visibleProduct.name;
    div.innerText = `R$ ${visibleProduct.price}`;


    newElement.append(img, title, div);
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
}



window.changeMode = changeMode;

window.onload = () => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(theme);
};

document.addEventListener('DOMContentLoaded', () => {
    featuringProducts();
});

