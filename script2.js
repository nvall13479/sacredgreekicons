document.addEventListener('DOMContentLoaded', () => {
    const availableGallery = document.getElementById('available-gallery');
    const pastGallery = document.getElementById('past-gallery');

    function createCard(icon) {
        const card = document.createElement('div');
        card.className = 'card';

        const buyButton = icon.status === 'available' 
            ? `<a href="${icon.ebayLink}" target="_blank" class="buy-btn">Buy on eBay</a>`
            : `<span class="sold-tag">Sold</span>`;

        card.innerHTML = `
            <img src="${icon.image}" alt="${icon.title}">
            <div class="card-content">
                <h3>${icon.title}</h3>
                <span class="price">${icon.price}</span>
                ${buyButton}
            </div>
        `;
        return card;
    }

    // Load data from icons.json
    async function loadIcons() {
        try {
            const response = await fetch('icons.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const icons = await response.json();
            
            icons.forEach(icon => {
                const card = createCard(icon);
                if (icon.status === 'available') {
                    availableGallery.appendChild(card);
                } else {
                    pastGallery.appendChild(card);
                }
            });
        } catch (error) {
            console.error('Error loading icons:', error);
            availableGallery.innerHTML = '<p>Error loading content. Please try again later.</p>';
        }
    }

    loadIcons();
});
