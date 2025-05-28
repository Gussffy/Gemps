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