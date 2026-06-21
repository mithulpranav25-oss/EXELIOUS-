/* ==========================================================================
   EXELIOUS LOGIC & INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initSplash();
    initStickyHeader();
    initMobileMenu();
    initScrollReveal();
    initActiveNavOnScroll();
});

/**
 * Manages the intro splash screen preloader sequence.
 */
function initSplash() {
    const splash = document.getElementById('splash-screen');
    
    // Add active class to body to prevent scrolling during intro
    document.body.classList.add('splash-active');
    
    // Smooth transition fade-out after 5 seconds
    setTimeout(() => {
        if (splash) {
            splash.classList.add('fade-out');
            document.body.classList.remove('splash-active');
            
            // Clean up the splash screen from DOM entirely after transition completes
            setTimeout(() => {
                splash.remove();
            }, 800);
        }
    }, 5000);
}


/**
 * Adds background border and styling to the header upon scrolling down.
 */
function initStickyHeader() {
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    // Initial check in case page starts scrolled
    handleScroll();
    window.addEventListener('scroll', handleScroll);
}

/**
 * Controls the mobile navigation menu overlay and transitions.
 */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('mobile-nav-overlay');
    const links = document.querySelectorAll('.mobile-nav-item, #mob-cta-call');
    
    const toggleMenu = () => {
        const isActive = overlay.classList.contains('active');
        if (isActive) {
            overlay.classList.remove('active');
            toggleBtn.classList.remove('open');
            document.body.style.overflow = '';
        } else {
            overlay.classList.add('active');
            toggleBtn.classList.add('open');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }
    };
    
    toggleBtn.addEventListener('click', toggleMenu);
    
    // Close menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            overlay.classList.remove('active');
            toggleBtn.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
    
    // Also style the mobile menu hamburger lines rotation using class
    // We add dynamic style rules for .open class in case it isn't fully defined in CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .mobile-menu-btn.open .bar:nth-child(1) {
            transform: translateY(7.5px) rotate(45deg);
        }
        .mobile-menu-btn.open .bar:nth-child(2) {
            opacity: 0;
        }
        .mobile-menu-btn.open .bar:nth-child(3) {
            transform: translateY(-7.5px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
}

/**
 * Fade-in/slide-up animation for sections as they enter the screen viewport.
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });
    
    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/**
 * Highlights the current active navigation item in the header based on scroll position.
 */
function initActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links .nav-item');
    
    const handleActiveNav = () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 200; // Offset for sticky navbar
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        // Handle special edge case: top of the page
        if (window.scrollY < 100) {
            currentSectionId = 'home';
        }
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${currentSectionId}` || (currentSectionId === 'home' && href === '#home')) {
                item.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', handleActiveNav);
    handleActiveNav(); // Run once on startup
}
