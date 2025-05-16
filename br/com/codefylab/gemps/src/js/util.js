document.addEventListener('DOMContentLoaded', function() {

    // Botão de login
    document.querySelectorAll('.botao-login').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = '../../index.html';
        });
    });

    // Botão de cadastro
    document.querySelectorAll('.botao-cadastro').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = '/br/com/codefylab/gemps/src/public/cadastro.html';
        });
    });

    // Botão específico para mapa (se necessário)
    const btnMapa = document.getElementById('botao-entrar');
    if(btnMapa) {
        btnMapa.addEventListener('click', () => {
            window.location.href = '../public/map.html';
        });
    }
});