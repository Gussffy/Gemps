// geojsonLoader.js
export async function loadGeoJSON(map) {
    try {
        const response = await fetch('https://raw.githubusercontent.com/Gussffy/Gemps/refs/heads/master/br/com/codefylab/gemps/src/teste/GEMPS.geojson');
        const data = await response.json();

        const datalist = document.getElementById('salasList');
        const nomesUnicos = new Set();
        const features = {};

        L.geoJSON(data, {
            pointToLayer: (feature, latlng) => {
                const nomeOriginal = feature.properties.Name.trim();
                const nomeNormalizado = nomeOriginal.toLowerCase();

                // Popula o datalist
                if (!nomesUnicos.has(nomeOriginal)) {
                    nomesUnicos.add(nomeOriginal);
                    const option = document.createElement('option');
                    option.value = nomeOriginal;
                    datalist.appendChild(option);
                }

                // Cria e armazena o marcador
                const marker = L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: '../img/Vector.svg',
                        iconSize: [20, 30]
                    })
                });
                features[nomeNormalizado] = marker;

                return marker;
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(feature.properties.Name.trim());
            }
        }).addTo(map);

        return features;
    } catch (error) {
        console.error('Erro ao carregar GeoJSON:', error);
        throw error;
    }
}