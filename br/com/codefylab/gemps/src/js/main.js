// js/app.js
import { initMap } from './mapManager.js';
import { loadGeoJSON } from './geojsonLoader.js';
import { setupSearch } from './searchHandler.js';
import { setupGeolocation } from './geolocation.js'; // Importe o módulo de geolocalização

const FACULDADE_COORDS = [-14.864416, -40.834072];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Inicialização do mapa
        const map = initMap('mapid', FACULDADE_COORDS);

        // Configura a geolocalização - retorna uma função de limpeza
        const cleanupGeolocation = setupGeolocation(map);

        // Carrega dados GeoJSON
        const features = await loadGeoJSON(map);

        // Configura busca
        setupSearch(features, map);

        // Limpeza quando a página for fechada
        window.addEventListener('beforeunload', () => {
            cleanupGeolocation();
        });

    } catch (error) {
        console.error('Erro na inicialização:', error);
        alert('Falha ao carregar o mapa. Atualize a página ou tente novamente mais tarde.');
    }
});