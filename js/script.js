/**
 * Portfolio Website - Main JavaScript
 * Author: Èrik Calvo Lledó
 *
 * This script handles interactive features including:
 * - Mobile navigation menu toggle
 * - Active navigation link tracking with animated pill indicator
 * - Scroll-based navigation highlighting (scroll spy)
 * - Theme switching between dark and light modes
 * - Scroll reveal animations for content sections
 * - Loading animation management
 */

// ========================================
// Mobile Navigation Menu Toggle
// ========================================

/**
 * Initializes mobile menu toggle functionality
 * @param {string} toggleId - ID of the toggle button element
 * @param {string} navId - ID of the navigation menu element
 */
const initializeMobileMenu = (toggleId, navId) => {
    const toggleButton = document.getElementById(toggleId);
    const navigationMenu = document.getElementById(navId);

    if (toggleButton && navigationMenu) {
        toggleButton.addEventListener('click', () => {
            navigationMenu.classList.toggle('show');
        });
    }
};

initializeMobileMenu('nav-toggle', 'nav-menu');


// ========================================
// Navigation Link Management
// ========================================

const navigationLinks = document.querySelectorAll('.nav-link');
const pageSections = document.querySelectorAll('.section');
const navigationPill = document.querySelector('.nav-pill');

/**
 * Animates the active link indicator pill to the specified element
 * Calculates position and dimensions relative to navigation menu
 * @param {HTMLElement} element - Target navigation link element
 */
function animateNavigationPill(element) {
    if (navigationPill && element) {
        const elementRect = element.getBoundingClientRect();
        const menuRect = element.closest('.nav-menu').getBoundingClientRect();

        // Calculate and apply pill position and dimensions
        navigationPill.style.width = `${elementRect.width}px`;
        navigationPill.style.height = `${elementRect.height}px`;
        navigationPill.style.left = `${elementRect.left - menuRect.left}px`;
        navigationPill.style.top = `${elementRect.top - menuRect.top}px`;
    }
}

/**
 * Handles navigation link click events
 * Updates active state, animates pill position, and closes mobile menu
 */
function handleNavigationClick() {
    // Remove active class from all links
    navigationLinks.forEach(link => link.classList.remove('active'));

    // Add active class to clicked link
    this.classList.add('active');
    animateNavigationPill(this);

    // Close mobile menu after navigation
    const mobileMenu = document.getElementById('nav-menu');
    mobileMenu.classList.remove('show');
}

// Attach click handlers to all navigation links
navigationLinks.forEach(link => link.addEventListener('click', handleNavigationClick));


// ========================================
// Scroll-Based Navigation Highlighting
// ========================================

/**
 * Updates active navigation link based on current scroll position
 * Implements scroll spy functionality to highlight current section
 */
function updateActiveNavigationOnScroll() {
    const scrollPosition = window.pageYOffset;

    // Clear all active states
    navigationLinks.forEach(link => link.classList.remove('active'));

    // Find and highlight the current section's navigation link
    pageSections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
            const activeLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
                animateNavigationPill(activeLink);
            }
        }
    });
}

// Attach scroll listener for navigation highlighting
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
        animateNavigationPill(activeLink);
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