// searchHandler.js
export function setupSearch(features, map) {
    // Normaliza os nomes das salas para busca case-insensitive
    const normalizedFeatures = Object.entries(features).reduce((acc, [key, value]) => {
        acc[key.toLowerCase()] = value;
        return acc;
    }, {});

    function buscarSala() {
        const input = document.getElementById('searchInput').value.trim().toLowerCase();
        const feedbackElement = document.getElementById('searchFeedback');

        // Reset feedback
        if (feedbackElement) feedbackElement.textContent = '';

        if (!input) return;

        // 1. Busca exata tem prioridade
        if (normalizedFeatures[input]) {
            const marker = normalizedFeatures[input];
            map.flyTo(marker.getLatLng(), 20);
            marker.openPopup();
            return;
        }

        // 2. Busca por substring
        const matches = Object.keys(normalizedFeatures)
            .filter(key => key.includes(input))
            .map(key => normalizedFeatures[key]);

        if (matches.length > 0) {
            // Vai para o primeiro resultado e mostra os demais no console
            const firstMatch = matches[0];
            map.flyTo(firstMatch.getLatLng(), 20);
            firstMatch.openPopup();

            // Log de resultados múltiplos
            if (matches.length > 1) {
                console.log(`${matches.length} salas encontradas. Primeira exibida:`);
                console.table(matches.map(m => m.feature.properties.name));
            }
        } else {

            if (feedbackElement) {
                feedbackElement.textContent = 'Sala não encontrada!';
            } else {
                console.log('Sala não encontrada!');
            }
        }
    }

    document.getElementById('searchInput').addEventListener('input', buscarSala);
}