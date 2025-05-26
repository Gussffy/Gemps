// geolocation.js
export function setupGeolocation(map) {
    let marker = null;
    let watchId = null;

    // Ícone simples sem rotação
    const compassIcon = L.divIcon({
        className: 'compass-marker',
        html: '<div class="arrow">' +
            '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M10 0.25C7.41502 0.252854 4.93672 1.281 3.10886 3.10886C1.281 4.93672 0.252854 7.41502 0.25 10C0.25 15.3756 4.62391 19.75 10 19.75C12.585 19.7471 15.0633 18.719 16.8911 16.8911C18.719 15.0633 19.7471 12.585 19.75 10C19.75 4.62391 15.3761 0.25 10 0.25ZM9.625 17.1719V10.375H2.82812L14.9688 5.02609L9.625 17.1719Z" fill="#55C1E2"/>\n' +
            '</svg></div>',
        iconSize: [100, 100],
        iconAnchor: [50, 50]
    });

    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
            pos => {
                const coords = [pos.coords.latitude, pos.coords.longitude];

                // Atualiza ou cria o marcador
                if (!marker) {
                    marker = L.marker(coords, { icon: locationIcon }).addTo(map);
                } else {
                    marker.setLatLng(coords); // Apenas move o marcador
                }

                // Removemos o panTo/center do código original!
            },
            err => console.error(`Erro de geolocalização: ${err.message}`),
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }

    // Limpeza
    return () => {
        if (watchId) navigator.geolocation.clearWatch(watchId);
        if (marker) map.removeLayer(marker);
    };
}