
// Gemps - Geolocation Setup


export function setupGeolocation(map) {
    let marker = null;
    let accuracyCircle = null;
    let watchId = null;

    const compassIcon = L.divIcon({
        className: 'compass-marker',
        html: '<div class="arrow">' +
            '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M10 0.25C7.41502 0.252854 4.93672 1.281 3.10886 3.10886C1.281 4.93672 0.252854 7.41502 0.25 10C0.25 15.3756 4.62391 19.75 10 19.75C12.585 19.7471 15.0633 18.719 16.8911 16.8911C18.719 15.0633 19.7471 12.585 19.75 10C19.75 4.62391 15.3761 0.25 10 0.25ZM9.625 17.1719V10.375H2.82812L14.9688 5.02609L9.625 17.1719Z" fill="#55C1E2"/>' +
            '</svg></div>',
        iconSize: [50, 50],
        iconAnchor: [10, 10]
    });

    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
            pos => {
                const coords = [pos.coords.latitude, pos.coords.longitude];
                const accuracy = pos.coords.accuracy;
                const heading = pos.coords.heading || 0;

                // Atualiza ou cria o marcador
                if (!marker) {
                    marker = L.marker(coords, {
                        icon: compassIcon,
                        rotationAngle: heading
                    }).addTo(map);
                } else {
                    marker.setLatLng(coords);
                    marker.setRotationAngle(heading);
                }

                const mapWidthMeters = map.getBounds().getEast() - map.getBounds().getWest();
                const maxRadius = mapWidthMeters * 5000;

                // Usa o menor valor entre a precisão real e o máximo aceitável
                const displayRadius = Math.min(accuracy, maxRadius);


                if (!accuracyCircle) {
                    accuracyCircle = L.circle(coords, {
                        radius: displayRadius,
                        fillOpacity: 0.2,
                        color: '#3388ff',
                        weight: 1
                    }).addTo(map);
                } else {
                    accuracyCircle.setLatLng(coords);
                    accuracyCircle.setRadius(displayRadius);
                }


                if (!marker.added) {
                    map.setView(coords, 18);
                    marker.added = true;
                }
            },
            err => {
                console.error(`Erro de geolocalização: ${err.message}`);
                alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
            }
        );
    } else {
        alert("Seu navegador não suporta geolocalização");
    }

    return () => {
        if (watchId) navigator.geolocation.clearWatch(watchId);
        if (marker) map.removeLayer(marker);
        if (accuracyCircle) map.removeLayer(accuracyCircle);
    };
}