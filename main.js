// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
const heroTl = gsap.timeline();

heroTl.from(".reveal", {
    y: 100,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power4.out"
});

// Global Scroll Reveal
gsap.utils.toArray(".reveal").forEach((elem) => {
    if (elem.closest(".hero") || elem.closest(".inner-hero")) return;

    ScrollTrigger.create({
        trigger: elem,
        start: "top 85%",
        onEnter: () => {
            gsap.fromTo(elem,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );
        },
        once: true
    });
});

// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('mobile-active');
        navbar.classList.toggle('active');

        if (navLinksContainer.classList.contains('mobile-active')) {
            gsap.from(".nav-link", {
                y: 20,
                opacity: 0,
                stagger: 0.1,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    });
}
