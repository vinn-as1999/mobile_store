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
// aplica o tema salvo ao carregar a página
window.onload = () => {
    const theme = localStorage.getItem('theme') || 'light';
    document.body.classList.add(theme);
};




