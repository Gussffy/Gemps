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
document.getElementById("botao-login").addEventListener("click", function() {
    window.location.href = "src/public/map.html"; // Redireciona para a página do mapa
});

var geojsonData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": { "Name": "Rota 1" },
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [-40.8333019, -14.8638218],
                    [-40.8332912, -14.8638429],
                    [-40.8332309, -14.8639523]
                ]
            }
        }
    ]
};

L.geoJSON(geojsonData, {
    style: function (feature) {
        return { color: "blue", weight: 3 };
    }
}).addTo(map);