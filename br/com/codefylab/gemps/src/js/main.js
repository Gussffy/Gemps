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

        // Outras inicializações podem ser adicionadas aqui

    } catch (error) {
        console.error('Erro na inicialização do aplicativo:', error);
        // Você pode adicionar tratamento de erro visual aqui
    }
});