export function setupGeolocation(map) {
    let marker = null;
    let accuracyCircle = null;
    let watchId = null;
    let currentCoords = null;

    // Ícone aprimorado com direção
    const compassIcon = L.divIcon({
        className: 'compass-marker',
        html: '<div class="arrow">' +
            '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path d="M10 0.25C7.41502 0.252854 4.93672 1.281 3.10886 3.10886C1.281 4.93672 0.252854 7.41502 0.25 10C0.25 15.3756 4.62391 19.75 10 19.75C12.585 19.7471 15.0633 18.719 16.8911 16.8911C18.719 15.0633 19.7471 12.585 19.75 10C19.75 4.62391 15.3761 0.25 10 0.25ZM9.625 17.1719V10.375H2.82812L14.9688 5.02609L9.625 17.1719Z" fill="#55C1E2"/>\n' +
            '</svg></div>',
        iconSize: [50, 50],
        iconAnchor: [10, 10]
    });

    // Função para centralizar na localização atual
    function centerOnUser() {
        if (currentCoords) {
            map.setView(currentCoords, 18);
        } else {
            alert("Localização ainda não disponível. Aguarde alguns segundos.");
        }
    }

    // Adiciona botão de controle
    L.Control.geolocationButton = L.Control.extend({
        onAdd: function(map) {
            const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
            const button = L.DomUtil.create('a', '', container);
            button.innerHTML = '📍';
            button.href = '#';
            button.title = 'Centralizar na minha localização';

            L.DomEvent.on(button, 'click', function(e) {
                L.DomEvent.stopPropagation(e);
                L.DomEvent.preventDefault(e);
                centerOnUser();
            });

            return container;
        }
    });

    L.control.geolocationButton = function(opts) {
        return new L.Control.geolocationButton(opts);
    };

    // Adiciona botão ao mapa
    const geolocationControl = L.control.geolocationButton({
        position: 'topleft'
    }).addTo(map);

    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
            pos => {
                const coords = [pos.coords.latitude, pos.coords.longitude];
                const accuracy = pos.coords.accuracy;
                const heading = pos.coords.heading || 0;
                currentCoords = coords; // Armazena as coordenadas atuais

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

                // Atualiza o círculo de precisão
                const mapWidthMeters = map.getBounds().getEast() - map.getBounds().getWest();
                const maxRadius = Math.min(accuracy, Math.max(10, mapWidthMeters * 0.005));

                if (!accuracyCircle) {
                    accuracyCircle = L.circle(coords, {
                        radius: maxRadius,
                        fillOpacity: 0.2,
                        color: '#3388ff',
                        weight: 1
                    }).addTo(map);
                } else {
                    accuracyCircle.setLatLng(coords);
                    accuracyCircle.setRadius(maxRadius);
                }

                // Atualiza o tooltip com precisão
                if (!accuracyCircle.getTooltip()) {
                    accuracyCircle.bindTooltip(`Precisão: ${Math.round(accuracy)}m`, {
                        permanent: false,
                        direction: 'top'
                    });
                } else {
                    accuracyCircle.setTooltipContent(`Precisão: ${Math.round(accuracy)}m`);
                }
            },
            err => {
                console.error(`Erro de geolocalização: ${err.message}`);
                alert("Não foi possível obter sua localização. Verifique as permissões do navegador.");
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 30000
            }
        );
    } else {
        alert("Seu navegador não suporta geolocalização");
    }

    // Retorna função de limpeza e função para centralizar
    return {
        cleanup: () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
            if (marker) map.removeLayer(marker);
            if (accuracyCircle) map.removeLayer(accuracyCircle);
            if (geolocationControl) map.removeControl(geolocationControl);
        },
        centerOnUser
    };
}