gsap.registerPlugin(ScrollTrigger);

// Dark Mode Toggle
const darkModeToggle = document.querySelector('.dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

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

// Product Fetching with Placeholders
async function fetchProducts() {
    const loader = document.querySelector('.loader');
    const productGrid = document.querySelector('.product-grid');
    
    loader.style.display = 'block';
    productGrid.innerHTML = Array(6).fill().map(() => `
        <div class="product-card-placeholder"></div>
    `).join('');

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

// Enhanced Product Rendering
function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = '';
    
    products.slice(0, 6).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-container">
                <img 
                    src="${product.image}" 
                    alt="${product.title}"
                    loading="lazy"
                    onload="this.classList.add('loaded')"
                    onerror="this.onerror=null;this.src='https://via.placeholder.com/300x400?text=Product+Image'"
                >
            </div>
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
        `;

        productGrid.appendChild(card);

        // Image load fallback
        setTimeout(() => {
            const img = card.querySelector('img');
            if (!img.classList.contains('loaded')) {
                img.src = 'https://via.placeholder.com/300x400?text=Product+Image';
                img.classList.add('loaded');
            }
        }, 3000);
    });

    // Product Card Animations
    gsap.utils.toArray(".product-card").forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.15,
            ease: "power2.out"
        });

        // Hover effects
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.02,
                duration: 0.3,
                ease: "power1.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3
            });
        });
    });
}

// Form Handling
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!contactForm.checkValidity()) {
        alert('Please fill out all fields correctly.');
        return;
    }

    const formData = new FormData(contactForm);
    
    try {
        const response = await fetch('https://formspree.io/f/your-form-id', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
        console.error('Form error:', error);
    }
});

// Initialize
fetchProducts();
