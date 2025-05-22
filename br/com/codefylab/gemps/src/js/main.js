// js/app.js
import { initMap } from './mapManager.js';
import { loadGeoJSON } from './geojsonLoader.js';
import { setupSearch } from './searchHandler.js';
import { setupGeolocation } from './geolocation.js';
const FACULDADE_COORDS = [-14.864416, -40.834072];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Inicialização do mapa
        const map = initMap('mapid', FACULDADE_COORDS);

        // Carrega dados GeoJSON
        const features = await loadGeoJSON(map);

        // Configura busca
        setupSearch(features, map);

        // Adiciona geolocalização
        setupGeolocation(map);// Integração da geolocalização

    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
});