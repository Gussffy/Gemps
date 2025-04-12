// searchHandler.js
export function setupSearch(features, map) {
    function buscarSala() {
        const input = document.getElementById('searchInput').value.trim().toLowerCase();
        if (!input) return;

        const matchKey = Object.keys(features).find(key => key.includes(input));

        if (matchKey) {
            const marker = features[matchKey];
            map.flyTo(marker.getLatLng(), 20);
            marker.openPopup();
        } else {
            alert('Sala não encontrada!');
        }
    }

    document.getElementById('searchInput').addEventListener('input', buscarSala);
}