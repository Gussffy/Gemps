document.addEventListener('DOMContentLoaded', function () {
    let map;

    // Coordenadas da faculdade
    const faculdadeCoords = [-14.864416, -40.834072];

    // Inicializa o mapa
    if (!map) {
        map = L.map('mapid', {
            center: faculdadeCoords, // Inicializa o mapa nas coordenadas da faculdade
            zoom: 18,
            maxZoom: 22,
            minZoom: 18,
            dragging: true,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            touchZoom: true,
        });

        // Adiciona a camada de tiles do MapTiler
        const key = 'xfjEnIcQ0ERJBgeBHhBc';
        const mtLayer = L.maptiler.maptilerLayer({
            apiKey: key,
            style: L.maptiler.MapStyle.STREETS,
        }).addTo(map);

        // Adiciona um evento de clique no mapa para exibir coordenadas
        map.on('click', function (e) {
            var coords = e.latlng; // Captura as coordenadas do ponto clicado
            L.popup()
                .setLatLng(coords)
                .setContent(`Coordenadas: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`)
                .openOn(map);
        });
    }

    fetch('https://raw.githubusercontent.com/CodeFyLab/Gemps/refs/heads/master/br/com/codefylab/gemps/teste/GEMPS.geojson')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao carregar o GeoJSON");
            }
            return response.json();
        })
        .then(data => {
            L.geoJSON(data, {
                // Estilização das features (linhas/polígonos)
                style: function (feature) {
                    return { color: "#ff7800", weight: 2 };
                },

                // Personalização dos marcadores (pontos)
                pointToLayer: function (feature, latlng) {
                    return L.marker(latlng, {
                        icon: L.icon({
                            iconUrl: '../img/Vector.svg' ,
                            iconSize: [20, 30]
                        })
                    });
                },

                // Pop-ups e interatividade
                onEachFeature: function (feature, layer) {
                    if (feature.properties && feature.properties.Name) {
                        layer.bindPopup(feature.properties.Name);
                    }
                }
            }).addTo(map);
        })
        .catch(error => console.error('Erro ao carregar o GeoJSON:', error));
    // Adiciona um evento de input ao campo de busca
    document.getElementById('searchInput').addEventListener('input', buscarSala);

    // Função success para geolocalização
    function success(pos) {
        // Adiciona um marcador para a localização do usuário
        L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map)
            .bindPopup('Você está aqui!')

    }

    function error(err) {
        console.log(`Erro ao obter localização: ${err.message}`);
    }

    // Configura a geolocalização
    if (navigator.geolocation) {
        let watchID = navigator.geolocation.watchPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 5000
        });
    }
});