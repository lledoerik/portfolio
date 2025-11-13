/**
 * Portfolio Website - Main JavaScript
 * Author: Èrik Calvo Lledó
 *
 * This script handles interactive features including:
 * - Active navigation link tracking with animated pill indicator
 * - Scroll-based navigation highlighting (scroll spy)
 * - Hide/show navbar based on scroll direction (desktop only)
 * - Theme switching between dark and light modes
 * - Scroll reveal animations for content sections
 * - Loading animation management
 * - Smooth scroll to sections with proper offset
 */

// ========================================
// Navigation Link Management
// ========================================

const navigationLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.section, .home');
const navigationPill = document.querySelector('.nav-pill');

/**
 * Animates the active link indicator pill to the specified element
 * Calculates position and dimensions relative to navigation menu
 * @param {HTMLElement} element - Target navigation link element
 */
function animateNavigationPill(element) {
    if (!navigationPill || !element) return;

    const list = element.closest('.nav-list');
    const elementRect = element.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();

    // Llegim el padding real del contenidor (no el restem directament)
    const listStyle = window.getComputedStyle(list);
    const paddingLeft = parseFloat(listStyle.paddingLeft);
    const paddingTop = parseFloat(listStyle.paddingTop);

    // Calculem la posició precisa dins de la nav-list
    const left = element.offsetLeft - list.scrollLeft;
    const top = element.offsetTop - list.scrollTop;

    // Ajustem la posició considerant padding i possible diferència de subpíxel
    navigationPill.style.width = `${element.offsetWidth}px`;
    navigationPill.style.height = `${element.offsetHeight}px`;
    navigationPill.style.left = `${left + paddingLeft}px`;
    navigationPill.style.top = `${top + paddingTop}px`;
}


/**
 * Handles navigation link click events
 * Updates active state and animates pill position
 */
function handleNavigationClick(event) {
    event.preventDefault();

    // Remove active class from all links
    navigationLinks.forEach(link => link.classList.remove('active'));

    // Add active class to clicked link
    this.classList.add('active');
    animateNavigationPill(this);

    // Smooth scroll to section
    const targetId = this.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        const headerOffset = targetId === '#home' ? 60 : 120;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Attach click handlers to all navigation links
navigationLinks.forEach(link => link.addEventListener('click', handleNavigationClick));


// ========================================
// Scroll-Based Navigation Highlighting & Hide/Show
// ======================================== */

let lastScrollTop = 0;
const floatingNav = document.querySelector('.floating-nav');
const scrollThreshold = 100;
const isMobile = window.innerWidth <= 768;

/**
 * Updates active navigation link based on current scroll position
 * Also handles hiding/showing the navbar based on scroll direction (desktop only)
 */
function updateActiveNavigationOnScroll() {
    const scrollPosition = window.pageYOffset;

    // Hide/Show navbar based on scroll direction (only on desktop)
    if (!isMobile && floatingNav) {
        if (Math.abs(scrollPosition - lastScrollTop) > scrollThreshold) {
            if (scrollPosition > lastScrollTop && scrollPosition > 300) {
                // Scrolling down & not at the very top
                floatingNav.classList.add('nav-hidden');
            } else {
                // Scrolling up
                floatingNav.classList.remove('nav-hidden');
            }
            lastScrollTop = scrollPosition;
        }
    }

    // Clear all active states
    navigationLinks.forEach(link => link.classList.remove('active'));

    // Find and highlight the current section's navigation link
    let currentSection = '';

    pageSections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop) {
            currentSection = sectionId;
        }
    });

    if (currentSection) {
        const activeLink = document.querySelector(`.nav-link[href*="${currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
            animateNavigationPill(activeLink);
        }
    }
}

// Attach scroll listener for navigation highlighting and hide/show
window.addEventListener('scroll', updateActiveNavigationOnScroll);


// ========================================
// Theme Toggle (Dark/Light Mode)
// ========================================

/**
 * Initializes theme switching functionality
 * Manages dark/light mode preferences with localStorage persistence
 */
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#checkbox');
    const storedTheme = localStorage.getItem('theme');

    // Apply saved theme preference or default to dark mode
    if (storedTheme) {
        document.documentElement.setAttribute('data-theme', storedTheme);
        themeToggle.checked = storedTheme === 'light';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.checked = false;
    }

    /**
     * Handles theme toggle switch changes
     * Saves preference to localStorage for persistence
     * @param {Event} event - Change event from theme toggle
     */
    function handleThemeSwitch(event) {
        const newTheme = event.target.checked ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }

    themeToggle.addEventListener('change', handleThemeSwitch);

    // Initialize navigation pill position on page load
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        // Wait for layout to settle
        setTimeout(() => {
            animateNavigationPill(activeLink);
        }, 100);
    }
});


// ========================================
// Scroll Reveal Animations
// ========================================

/**
 * Configures and initializes ScrollReveal animations
 * Creates staggered reveal effects for different content sections
 * Animations trigger when elements enter viewport
 */
const scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
});

// Home section animations with staggered delays
scrollReveal.reveal('.home-title', {});
scrollReveal.reveal('.button', { delay: 200 });
scrollReveal.reveal('.home-img', { delay: 400 });
scrollReveal.reveal('.home-social', { delay: 400 });

// About section animations
scrollReveal.reveal('.about-img', {});
scrollReveal.reveal('.about-subtitle', { delay: 200 });
scrollReveal.reveal('.about-text', { delay: 400 });

// Skills section animations with sequential intervals
scrollReveal.reveal('.skills-subtitle', { delay: 100 });
scrollReveal.reveal('.skills-text', { delay: 150 });
scrollReveal.reveal('.skills-data', { interval: 200 });
scrollReveal.reveal('.skills-img', { delay: 400 });

// Project section animations
scrollReveal.reveal('.work-img', { interval: 200 });

// Contact section animations
scrollReveal.reveal('.contact-input', { interval: 200 });


// ========================================
// Loading Animation Management
// ========================================

/**
 * Manages the initial page loading animation
 * Displays animation for 3 seconds, then fades out and removes from DOM
 */
window.addEventListener('load', () => {
    const animationContainer = document.getElementById('animation-container');

    if (animationContainer) {
        // Wait for animation to complete before hiding
        setTimeout(() => {
            animationContainer.classList.add('hide');
        }, 3000);

        // Remove element from DOM after fade-out transition completes
        animationContainer.addEventListener('transitionend', () => {
            if (animationContainer.classList.contains('hide')) {
                animationContainer.remove();
            }
        });
    }
});


// ========================================
// Resize Handler
// ========================================

/**
 * Updates mobile flag on window resize
 */
window.addEventListener('resize', () => {
    const wasMobile = isMobile;
    const nowMobile = window.innerWidth <= 768;

    if (wasMobile !== nowMobile && floatingNav) {
        // Reset navbar visibility when switching between mobile/desktop
        floatingNav.classList.remove('nav-hidden');
    }
});