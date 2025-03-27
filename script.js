// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animation
gsap.from(".hero h1", {
    scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom center",
        scrub: true,
    },
    y: 100,
    opacity: 0,
    duration: 1,
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Product Fetching
async function fetchProducts() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'block';

    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        loader.style.display = 'none';
        renderProducts(products);
    } catch (error) {
        loader.innerHTML = '⚠️ Error loading products. Please try again later.';
        console.error('Fetch error:', error);
    }
}

// Render Products
function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear previous content
    
    products.slice(0, 6).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title}</h3>
            <p>$${product.price}</p>
        `;
        productGrid.appendChild(card);
    });

    // An
