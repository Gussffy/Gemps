export function setupSearch(geoData, map) {
    const { markers, salaNames } = geoData;
    const searchInput = document.getElementById('searchInput');
    const searchContainer = document.querySelector('.search-container');
    const suggestionsContainer = document.getElementById('searchSuggestions');
    const feedbackElement = document.getElementById('searchFeedback');

    // Normaliza os nomes para busca case-insensitive
    const normalizedFeatures = Object.entries(markers).reduce((acc, [key, value]) => {
        acc[key.toLowerCase()] = value;
        return acc;
    }, {});

    // Mostrar sugestões no estilo Google
    function showSuggestions(suggestions) {
        suggestionsContainer.innerHTML = '';

        if (suggestions.length === 0) {
            searchContainer.classList.remove('has-suggestions');
            suggestionsContainer.classList.remove('active');
            return;
        }

        searchContainer.classList.add('has-suggestions');

        suggestions.slice(0, 8).forEach(sala => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            div.innerHTML = `
                <span class="suggestion-text">${sala}</span>
            `;

            div.addEventListener('click', () => {
                searchInput.value = sala;
                searchContainer.classList.remove('has-suggestions');
                suggestionsContainer.classList.remove('active');
                buscarSala();
            });

            suggestionsContainer.appendChild(div);
        });

        suggestionsContainer.classList.add('active');
        feedbackElement.classList.remove('active');
    }

    // Função de busca
    function buscarSala() {
        const input = searchInput.value.trim().toLowerCase();

        // Resetar feedback
        feedbackElement.textContent = '';
        feedbackElement.className = '';
        feedbackElement.classList.remove('active');

        if (!input) {
            searchContainer.classList.remove('has-suggestions');
            suggestionsContainer.classList.remove('active');
            return;
        }

        // 1. Busca exata
        if (normalizedFeatures[input]) {
            const marker = normalizedFeatures[input];
            map.flyTo(marker.getLatLng(), 20);
            marker.openPopup();
            searchContainer.classList.remove('has-suggestions');
            suggestionsContainer.classList.remove('active');
            return;
        }

        // 2. Busca por similaridade
        const matches = salaNames.filter(name =>
            name.toLowerCase().includes(input)
        );

        if (matches.length > 0) {
            showSuggestions(matches);
        } else {
            feedbackElement.innerHTML = `
                <div class="feedback-error">
                    Sala não encontrada!
                </div>
            `;
            feedbackElement.classList.add('active');
            searchContainer.classList.add('has-suggestions');
            suggestionsContainer.classList.remove('active');
        }
    }

    // Event listeners
    searchInput.addEventListener('input', buscarSala);
    searchInput.addEventListener('focus', () => {
        if (searchInput.value.trim() !== '') {
            buscarSala();
        }
    });

    // Fechar sugestões ao clicar fora
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            searchContainer.classList.remove('has-suggestions');
            suggestionsContainer.classList.remove('active');
            feedbackElement.classList.remove('active');
        }
    });
}