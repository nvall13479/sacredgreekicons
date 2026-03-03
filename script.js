document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Populate page content from config
    const populateFromConfig = () => {
        if (typeof config !== 'undefined') {
            if (document.getElementById("page-title")) document.getElementById("page-title").innerText = config.pageTitle;
            if (document.getElementById("logo-text")) document.getElementById("logo-text").innerText = config.logoText;
            if (document.getElementById("logo-tagline")) document.getElementById("logo-tagline").innerText = config.logoTagline;
            
            if (document.getElementById("hero-subtitle")) document.getElementById("hero-subtitle").innerText = config.hero.subtitle;
            if (document.getElementById("hero-title")) document.getElementById("hero-title").innerHTML = config.hero.title;
            if (document.getElementById("hero-description")) document.getElementById("hero-description").innerHTML = config.hero.description;
            
            const heroBtn = document.getElementById("hero-button");
            if (heroBtn) {
                const icon = heroBtn.querySelector('i');
                heroBtn.innerHTML = '';
                if (icon) heroBtn.appendChild(icon);
                heroBtn.appendChild(document.createTextNode(' ' + config.hero.buttonText));
            }
        }
    };

    // 2. Συναρτήση δημιουργίας κάρτας (Component)
// 2. Συναρτήση δημιουργίας κάρτας (Component)
// 2. Συναρτήση δημιουργίας κάρτας (Component)
    function createCard(icon) {
        const card = document.createElement("div");
        card.className = "card";

        const firstImage = (icon.images && icon.images.length > 0) ? icon.images[0] : 'placeholder.jpg';
        const imageSrc = `img/${firstImage}`;
        
        const productId = icon.id || icon.title.toLowerCase().replace(/\s+/g, '-');

        // Καθορίζουμε τα κουμπιά βάσει του status
        let actionButtons = "";

        if (icon.status === "available") {
            // Για τα διαθέσιμα: eBay + Details
            actionButtons = `
                <div class="card-buttons">
                    <a href="${icon.ebayLink}" target="_blank" class="buy-btn">Buy on eBay</a>
                    <a href="product-page.html?id=${productId}" class="view-btn">Details</a>
                </div>`;
        } else {
            // Για τα παλαιότερα έργα: Μόνο Details
            actionButtons = `
                <div class="card-buttons">
                    <a href="product-page.html?id=${productId}" class="view-btn" style="width: 100%; text-align: center;">Details</a>
                </div>`;
        }

        card.innerHTML = `
            <div class="card-image-container">
                <img src="${imageSrc}" alt="${icon.title}" loading="lazy">
            </div>
            <div class="card-content">
                <h3>${icon.title}</h3>
                <span class="price">${icon.price}</span>
                ${actionButtons}
            </div>
        `;
        return card;
    }

    // 3. Φόρτωση των Icons από το data.js
    function loadIcons() {
        const availableGallery = document.getElementById("available-gallery");
        const pastGallery = document.getElementById("past-gallery");

        if (availableGallery) availableGallery.innerHTML = '';
        if (pastGallery) pastGallery.innerHTML = '';

        if (typeof iconsData !== 'undefined' && Array.isArray(iconsData)) {
            iconsData.forEach(icon => {
                const card = createCard(icon);
                if (icon.status === 'available') {
                    if (availableGallery) availableGallery.appendChild(card);
                } else {
                    if (pastGallery) pastGallery.appendChild(card);
                }
            });
        } else {
            console.error("Τα δεδομένα (iconsData) δεν βρέθηκαν.");
        }
    }

    populateFromConfig();
    loadIcons();
});