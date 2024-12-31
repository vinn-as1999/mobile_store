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
}


function featuringProducts() {
    const element = document.getElementsByClassName('featuring');
    const featuring = element[0];

    const prod1 = categories.iPhone[0];
    const prod2 = categories.ASUS[1];
    const prod3 = categories.Samsung[2]

    

};


window.changeMode = changeMode;

window.onload = () => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(theme);
};

document.addEventListener('DOMContentLoaded', () => {
    featuringProducts();
})

