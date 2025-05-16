document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM pronto!'); // Verifique se isso aparece no console

    // Botão de login
    document.querySelectorAll('.botao-login').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
    });

    // Botão de cadastro
    document.querySelectorAll('.botao-cadastro').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = '../public/cadastro.html';
        });
    });

    // Botão específico para mapa
    const btnMapa = document.getElementById('botao-entrar');
    if (btnMapa) {
        btnMapa.addEventListener('click', () => {
            window.location.href = '../public/map.html';
        });
    }
});