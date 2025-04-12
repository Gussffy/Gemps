// js/app.js
import { initMap } from './mapManager.js';
import { loadGeoJSON } from './geojsonLoader.js';
import { setupSearch } from './searchHandler.js';

// Coordenadas da faculdade
const FACULDADE_COORDS = [-14.864416, -40.834072];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Inicializa o mapa
        const map = initMap('mapid', FACULDADE_COORDS);

        // Carrega os dados GeoJSON
        const features = await loadGeoJSON(map);

        // Configura o sistema de busca
        setupSearch(features, map);

        // Configura o roteamento (opcional)
        setupRouting(map);


    } catch (error) {
        console.error('Erro na inicialização do aplicativo:', error);
        // Você pode adicionar tratamento de erro visual aqui
    }
});
document.getElementById("botao-login").addEventListener("click", function() {
    window.location.href = "src/public/map.html"; // Redireciona para a página do mapa
});