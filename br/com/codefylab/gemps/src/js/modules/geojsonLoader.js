export async function loadGeoJSON(map) {
    try {
        console.log('Iniciando carregamento do GeoJSON...');
        const geoJSONUrl = 'https://raw.githubusercontent.com/Gussffy/Gemps/refs/heads/gussffy-branch/br/com/codefylab/gemps/src/teste/GEMPS.geojson';

        const response = await fetch(geoJSONUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log('Dados do GeoJSON carregados:', data);

        const markers = {};
        const salaNames = new Set(); // Armazenar nomes únicos

        const geoJSONLayer = L.geoJSON(data, {
            pointToLayer: (feature, latlng) => {

                const nomeOriginal = feature.properties.Name.trim();
                salaNames.add(nomeOriginal); // Adiciona ao conjunto de nomes

                const marker = L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: "../../../gemps/src/img/point.svg",
                        iconSize: [25, 25],
                        iconAnchor: [12, 12]
                    })
                });

                markers[nomeOriginal.toLowerCase()] = marker;
                return marker;
            },

            onEachFeature: (feature, layer) => {
                if (feature.properties?.Name) {
                    layer.bindPopup(feature.properties.Name.trim());
                }
            }

        });

        geoJSONLayer.addTo(map);
        console.log('GeoJSON adicionado ao mapa com sucesso!');

        // Retorna tanto os markers quanto os nomes das salas
        return {
            markers,
            salaNames: Array.from(salaNames) // Já converte Set para Array
        };
    } catch (error) {
        console.error('Erro ao carregar GeoJSON:', error);
        throw error;
    }
}