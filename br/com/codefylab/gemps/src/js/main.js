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

    } catch (error) {
        console.error('Erro na inicialização:', error);
    }
});