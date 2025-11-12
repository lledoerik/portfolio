//Toggling Menu
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        })
    }
}

showMenu('nav-toggle', 'nav-menu');

//Toggling Active Link and Scroll Spy
const navLink = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const navPill = document.querySelector('.nav-pill');

function movePill(element) {
    if (navPill && element) {
        const rect = element.getBoundingClientRect();
        const navMenuRect = element.closest('.nav-menu').getBoundingClientRect();

        navPill.style.width = `${rect.width}px`;
        navPill.style.height = `${rect.height}px`;
        navPill.style.left = `${rect.left - navMenuRect.left}px`;
        navPill.style.top = `${rect.top - navMenuRect.top}px`;
    }
}

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');
    movePill(this);

    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Initialize pill position
window.addEventListener('load', () => {
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        movePill(activeLink);
    }
});

// Scroll Spy - Update active link based on scroll position
function scrollActive() {
    const scrollY = window.pageYOffset;

    // Primer, eliminem 'active' de tots els links
    navLink.forEach(n => n.classList.remove('active'));

    // Després trobem quina secció està activa i afegim la classe
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            const activeLink = document.querySelector('.nav-link[href*=' + sectionId + ']');
            if (activeLink) {
                activeLink.classList.add('active');
                movePill(activeLink);
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.querySelector('#checkbox');
    const currentTheme = localStorage.getItem('theme');

    // Verifica si l'usuari ja té una preferència guardada
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'light') {
            toggleSwitch.checked = true;
        }
    } else {
        // Si no hi ha preferència guardada, estableix dark mode per defecte
        document.documentElement.setAttribute('data-theme', 'dark');
        toggleSwitch.checked = false;
    }

    // Funció per canviar entre dark i light mode
    function switchTheme(e) {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    }

    // Escolta el canvi d'estat de l'interruptor
    toggleSwitch.addEventListener('change', switchTheme);
});

// Scroll Reveal
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

sr.reveal('.home-title', {} )
sr.reveal('.button', {delay: 20} )
sr.reveal('.home-img', {delay: 40} )
sr.reveal('.home-social', {delay: 40,} )

sr.reveal('.about-img', {} )
sr.reveal('.about-subtitle', {delay: 20} )
sr.reveal('.about-text', {delay: 40} )

sr.reveal('.skills-subtitle', {delay: 10} )
sr.reveal('.skills-text', {delay: 15} )
sr.reveal('.skills-data', {interval: 20} )
sr.reveal('.skills-img', {delay: 40} )

sr.reveal('.work-img', {interval: 20} )

sr.reveal('.contact-input', {interval: 20} )



// Animation SVG
window.addEventListener('load', () => {
    const animationContainer = document.getElementById('animation-container');

    if (animationContainer) {
        // Espera 3.5s (durada animació) + 0.5s addicional abans de començar a amagar
        setTimeout(() => {
            animationContainer.classList.add('hide');
        }, 3000);

        animationContainer.addEventListener('transitionend', () => {
            if (animationContainer.classList.contains('hide')) {
                animationContainer.remove();
            }
        });
    }
});