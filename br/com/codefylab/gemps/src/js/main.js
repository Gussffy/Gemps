import { initMap } from './modules/mapManager.js';
import { loadGeoJSON } from './modules/geojsonLoader.js';
import { setupSearch } from './modules/searchHandler.js';
import { setupGeolocation } from './modules/geolocation.js';

const FACULDADE_COORDS = [-14.864416, -40.834072];

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const map = initMap('mapid', FACULDADE_COORDS);
        const cleanupGeolocation = setupGeolocation(map);
        const features = await loadGeoJSON(map);
        setupSearch(features, map);

        window.addEventListener('beforeunload', () => {
            cleanupGeolocation();
        });

        // Atalho de teclado para rotação (Shift + R)
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && e.key === 'R') {
                map.setRotation(0);
            }
        });

    } catch (error) {
        console.error('Erro na inicialização:', error);
        alert('Falha ao carregar o mapa. Atualize a página ou tente novamente mais tarde.');
    }
});