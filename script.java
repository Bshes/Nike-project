// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Text Animation
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

// Product Grid Animation
gsap.utils.toArray(".product-card").forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.5,
    });
});

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Fetch Products from API
async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error(error);
    }
}

// Render Products
function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    
    products.slice(0, 6).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card fade-in';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title}</h3>
        `;
        productGrid.appendChild(card);
    });
}

// Form Validation & Submission
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Simple validation
    const isValid = contactForm.checkValidity();
    if (!isValid) return;

    // Submit via Formspree
    const formData = new FormData(contactForm);
    const response = await fetch('https://formspree.io/f/your-form-id', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        alert('Message sent!');
        contactForm.reset();
    } else {
        alert('Error sending message.');
    }
});

// Initialize
fetchProducts();
