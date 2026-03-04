document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. POPULATE CONTENT FROM CONFIG ---
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
                
                // Προσθήκη Tracking στο Hero Button
                heroBtn.addEventListener('click', () => {
                    if (typeof gtag === 'function') {
                        gtag('event', 'click_hero_button', { 'event_category': 'Engagement' });
                    }
                });
            }
        }
    };

    // --- 2. CARD COMPONENT ---
    function createCard(icon) {
        const card = document.createElement("div");
        card.className = "card";
        const firstImage = (icon.images && icon.images.length > 0) ? icon.images[0] : 'placeholder.jpg';
        const imageSrc = `img/${firstImage}`;
        const productId = icon.id || icon.title.toLowerCase().replace(/\s+/g, '-');

        let actionButtons = "";
        if (icon.status === "available") {
            actionButtons = `
                <div class="card-buttons">
                    <a href="${icon.ebayLink}" 
                       target="_blank" 
                       class="buy-btn" 
                       onclick="if(typeof gtag === 'function'){ gtag('event', 'click_ebay_home', { 'product_name': '${icon.title}' }); }">
                       Buy on eBay
                    </a>
                    <a href="product-page.html?id=${productId}" class="view-btn">Details</a>
                </div>`;
        } else {
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

    // --- 3. LOAD ICONS DATA ---
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
        }
    }

    // --- 4. NAVIGATION LOGIC ---
    const initNavigation = () => {
        const menuBtn = document.getElementById('mobile-menu-open');
        const closeBtn = document.getElementById('mobile-menu-close');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');
        const backToTopBtn = document.getElementById("backToTop");

        function toggleMenu() {
            if (sidebar && overlay) {
                sidebar.classList.toggle('active');
                overlay.classList.toggle('active');
            }
        }

        if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
        if (closeBtn) closeBtn.addEventListener('click', toggleMenu);
        if (overlay) overlay.addEventListener('click', toggleMenu);

        if (backToTopBtn) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 400) {
                    backToTopBtn.classList.add("show");
                } else {
                    backToTopBtn.classList.remove("show");
                }
            });

            backToTopBtn.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }
    };

    // --- 5. SMOOTH SCROLL LOGIC ---
    const setupSmoothScroll = () => {
        const allLinks = document.querySelectorAll('.nav-links a, .sidebar-links a');
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        allLinks.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href && href.includes('#')) {
                    const parts = href.split('#');
                    const targetId = parts[1];
                    
                    // Βελτιωμένος έλεγχος για την αρχική σελίδα
                    const isHomePage = window.location.pathname.includes('index.html') || 
                                     window.location.pathname.endsWith('/') || 
                                     window.location.pathname === '';

                    if (isHomePage) {
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            e.preventDefault();
                            if (sidebar && sidebar.classList.contains('active')) {
                                sidebar.classList.remove('active');
                                overlay.classList.remove('active');
                            }
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                    }
                }
            });
        });
    };

    // EXECUTE ALL
    populateFromConfig();
    loadIcons();
    initNavigation();
    setupSmoothScroll();
});