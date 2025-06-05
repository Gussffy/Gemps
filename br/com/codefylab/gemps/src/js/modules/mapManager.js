// mapManager.js

export function initMap() {
    const faculdadeCoords = [-14.864416, -40.834072];

    const map = L.map('mapid', {
        center: faculdadeCoords,
        zoom: 18,
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
        style: "https://api.maptiler.com/maps/dataviz/style.json?key=xfjEnIcQ0ERJBgeBHhBc",
    }).addTo(map);

    return map;
}