document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.botao-login').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = '../../index.html';
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