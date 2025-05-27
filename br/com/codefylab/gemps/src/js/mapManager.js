// mapManager.js
export function initMap() {
    const faculdadeCoords = [-14.864416, -40.834072];

    const map = L.map('mapid', {
        center: faculdadeCoords,
        zoom: 18,
        maxZoom: 22,
        minZoom: 18,
        dragging: true,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,

    });
    // Define os limites máximos do mapa
    map.setMaxBounds([
        [-14.861878, -40.832191], // sudoeste (latitude mínima, longitude mínima)
        [-14.865630, -40.835774]  // nordeste (latitude máxima, longitude máxima)
    ]);

    // Camada do MapTiler
    const key = 'xfjEnIcQ0ERJBgeBHhBc';
    L.maptiler.maptilerLayer({
        apiKey: key,
        style: L.maptiler.MapStyle.PASTEL,
    }).addTo(map);
// Evento de clique para coordenadas
    map.on('click', function (e) {
        L.popup()
            .setLatLng(e.latlng)
            .setContent(`Coordenadas: ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}`)
            .openOn(map);
    });

    return map;
}