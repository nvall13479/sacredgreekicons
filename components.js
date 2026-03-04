// components.js

const headerTemplate = `
<div class="top-bar">
    <div class="menu-toggle" id="mobile-menu-open">
        <i class="fas fa-bars"></i>
    </div>

    <div class="main-logo">
        <a href="index.html">
            <img src="img/logo.png" alt="LezasIcon Logo">
        </a>
    </div>

    <nav class="nav-links">
        <a href="index.html#available">Available Works</a>
        <a href="index.html#past-works">Past Works</a>
        <a href="#contact">Contact</a>
    </nav>

    <div class="user-actions">
        <a href="#" class="action-icon"><i class="fas fa-user"></i></a>
        <a href="#" class="action-icon cart-icon">
            <i class="fas fa-shopping-bag"></i>
            <span class="cart-count">0</span>
        </a>
    </div>
</div>
`;

const sidebarTemplate = `
<div class="sidebar-header">
    <i class="fas fa-times" id="mobile-menu-close"></i>
</div>
<nav class="sidebar-links">
    <a href="index.html#available">Available Works</a>
    <a href="index.html#past-works">Past Works</a>
    <a href="#contact">Contact</a>
</nav>
`;

const footerTemplate = `
<p>&copy; 2026 LezasIcon. All rights reserved.</p>
<p>Find me on <a href="https://www.ebay.com" target="_blank">eBay</a></p>
`;

document.addEventListener("DOMContentLoaded", () => {
    // Εισαγωγή Header
    const headerElem = document.querySelector('header');
    if (headerElem) headerElem.innerHTML = headerTemplate;

    // Εισαγωγή Sidebar
    const sidebarElem = document.getElementById('sidebar');
    if (sidebarElem) sidebarElem.innerHTML = sidebarTemplate;

    // Εισαγωγή Footer
    const footerElem = document.querySelector('footer');
    if (footerElem) footerElem.innerHTML = footerTemplate;
});