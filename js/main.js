 // script.js
document.addEventListener('DOMContentLoaded', function() {
    // ===== Mobile Menu Toggle =====
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');
    
    hamburger.addEventListener('click', function() {
        // Toggle mobile menu
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        navbar.classList.toggle('menu-open');
        
        // Animate hamburger icon
        const lines = this.querySelectorAll('.hamburger-line');
        lines.forEach(line => line.classList.toggle('active'));
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                navbar.classList.remove('menu-open');
                hamburger.querySelectorAll('.hamburger-line').forEach(line => 
                    line.classList.remove('active')
                );
            }
        });
    });

    // ===== Sticky Navbar on Scroll =====
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ===== Animate Buttons on Hover =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        button.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });

    // ===== Product Card Interactions =====
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
        
        // Click effect
        card.addEventListener('mousedown', function() {
            this.classList.add('clicked');
        });
        
        card.addEventListener('mouseup', function() {
            this.classList.remove('clicked');
        });
    });

    // ===== Smooth Scrolling for Anchor Links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== Typing Animation Enhancement =====
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        // Save original text
        const originalText = element.textContent;
        element.setAttribute('data-text', originalText);
        
        // Reset animation
        setTimeout(() => {
            element.style.animation = 'none';
            void element.offsetHeight; // Trigger reflow
            element.style.animation = null;
        }, 100);
    });

    // ===== Footer Year Update =====
    const yearElement = document.querySelector('.footer-copyright');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.textContent = yearElement.textContent.replace('2023', currentYear);
    }

    // ===== Product Button Actions =====
    document.querySelectorAll('.btn-product').forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;
            
            // Add visual feedback
            this.textContent = 'Menambahkan...';
            this.classList.add('loading');
            
            setTimeout(() => {
                this.textContent = 'Beli Sekarang';
                this.classList.remove('loading');
                
                // Here you would typically add to cart functionality
                console.log(`Added to cart: ${productName} (${productPrice})`);
                
                // Show confirmation (you can replace with a proper notification system)
                const confirmation = document.createElement('div');
                confirmation.className = 'product-confirmation';
                confirmation.textContent = `${productName} ditambahkan ke keranjang!`;
                productCard.appendChild(confirmation);
                
                setTimeout(() => {
                    confirmation.remove();
                }, 2000);
            }, 800);
        });
    });

    // ===== Scroll Reveal Animation =====
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.card, .section-title');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('revealed');
            }
        });
    };
    
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) &&
            window.innerWidth > 768) {
            window.location.href = "index.html";
        }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});