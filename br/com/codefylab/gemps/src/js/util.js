
    // Botão de logiin
    document.querySelectorAll('.botao-login').forEach(btn => {
        btn.addEventListener('click', () => {
            window.location.href = '../../../../../../../index.html';
        });
    });

    // Botão de cadastro
    const btnEntrar = document.getElementById('botao-cadastro');
    if(btnEntrar) {
        btnEntrar.addEventListener('click', () => {
            window.location.href = 'public/cadastro.html';
        });
    }

    const btnMapa = document.getElementById('botao-entrar');
    if(btnMapa) {
        btnMapa.addEventListener('click', () => {
            window.location.href = '../public/map.html';
        });
    }