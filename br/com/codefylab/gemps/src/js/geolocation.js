// geolocation.js
export function setupGeolocation(map) {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            pos => {
                L.marker([pos.coords.latitude, pos.coords.longitude])
                    .addTo(map)
                    .bindPopup('Você está aqui!');
            },
            err => console.error(`Erro de geolocalização: ${err.message}`),
            { enableHighAccuracy: true, timeout: 5000 }
        );
    }
}