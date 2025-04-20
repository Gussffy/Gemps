// js/app.js
import { initMap } from './mapManager.js';
import { loadGeoJSON } from './geojsonLoader.js';
import { setupSearch } from './searchHandler.js';

const FACULDADE_COORDS = [-14.864416, -40.834072];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const map = initMap('mapid', FACULDADE_COORDS);
        const features = await loadGeoJSON(map);

        setupSearch(features, map);

<<<<<<< HEAD
        // Configura o roteamento (opcional)
        setupRouting(map);


=======
>>>>>>> 2095302a4be445691764c8c28210c63335650672
    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
});
document.getElementById("botao-login").addEventListener("click", function() {
    window.location.href = "src/public/map.html"; // Redireciona para a página do mapa
});