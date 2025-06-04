export function setupSearch(features, map) {
    const normalizedFeatures = Object.entries(features).reduce((acc, [key, value]) => {
        acc[key.toLowerCase()] = value;
        return acc;
    }, {});

    function buscarSala() {
        const input = document.getElementById('searchInput').value.trim().toLowerCase();
        const feedbackElement = document.getElementById('searchFeedback');

        // Reset do feedback
        feedbackElement.textContent = '';
        feedbackElement.className = 'feedback-hidden';

        if (!input) return;

        // 1. Busca exata
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
            const firstMatch = matches[0];
            map.flyTo(firstMatch.getLatLng(), 20);
            firstMatch.openPopup();
        } else {
            // Exibir feedback visual na página
            feedbackElement.textContent = 'Sala não encontrada!';
            feedbackElement.className = 'feedback-error';

            // Opcional: resetar após 3 segundos
            setTimeout(() => {
                feedbackElement.className = 'feedback-hidden';
            }, 3000);
        }
    }

    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            buscarSala();
        }
    });

    // Se tiver um botão de pesquisa
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', buscarSala);
    }
}