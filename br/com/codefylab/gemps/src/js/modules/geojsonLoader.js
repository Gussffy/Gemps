export async function loadGeoJSON(map) {
    try {
        console.log('Iniciando carregamento do GeoJSON...');

        const geoJSONUrl = 'https://raw.githubusercontent.com/Gussffy/Gemps/refs/heads/gussffy-branch/br/com/codefylab/gemps/src/teste/GEMPS.geojson';
        console.log('URL do GeoJSON:', geoJSONUrl);

        const response = await fetch(geoJSONUrl);
        console.log('Resposta da requisição:', response);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dados do GeoJSON carregados:', data);

        const datalist = document.getElementById('salasList');
        if (!datalist) {
            throw new Error('Elemento datalist não encontrado');
        }

        const nomesUnicos = new Set();
        const markers = {};

        const geoJSONLayer = L.geoJSON(data, {
            pointToLayer: (feature, latlng) => {
                console.log('Processando ponto:', feature);

                if (!feature.properties || !feature.properties.Name) {
                    console.warn('Feature sem propriedade Name:', feature);
                    return L.marker(latlng);
                }

                const nomeOriginal = feature.properties.Name.trim();
                const nomeNormalizado = nomeOriginal.toLowerCase();

                // Popula o datalist
                if (!nomesUnicos.has(nomeOriginal)) {
                    nomesUnicos.add(nomeOriginal);
                    const option = document.createElement('option');
                    option.value = nomeOriginal;
                    datalist.appendChild(option);
                }

                // Cria o marcador
                const marker = L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: "../../../gemps/src/img/point.svg",
                        iconSize: [25, 25],
                        iconAnchor: [12, 12]
                    })
                });

                markers[nomeNormalizado] = marker;

                return marker;
            },
            onEachFeature: (feature, layer) => {
                if (feature.properties && feature.properties.Name) {
                    layer.bindPopup(feature.properties.Name.trim());
                }
            }
        });

        geoJSONLayer.addTo(map);
        console.log('GeoJSON adicionado ao mapa com sucesso!');

        return markers;
    } catch (error) {
        console.error('Erro ao carregar GeoJSON:', error);
        throw error;
    }
}