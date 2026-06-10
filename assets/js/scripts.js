// ── Mobile Hamburger Menu ─────────────────────────
const menuBtn = document.querySelector('.menu-btn');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links a');

if (menuBtn && navLinksContainer) {
    menuBtn.addEventListener('click', () => {
        const isActive = navLinksContainer.classList.toggle('nav-active');
        menuBtn.textContent = isActive ? 'Close' : 'Menu';
    });

    // Close mobile menu when clicking any link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('nav-active');
            menuBtn.textContent = 'Menu';
        });
    });
}

// ── Active nav link on scroll ─────────────────────
const sections = document.querySelectorAll('section[id]');
if (sections.length > 0 && navLinks.length > 0) {
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('active');
            }
        });
    }, { passive: true });
}

// ── Scroll reveal observer ────────────────────────
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('in-view');
                }, (i % 4) * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));
}

// ── Stagger skill blocks, project cards, & edu cards ──
document.querySelectorAll('.skill-block, .project-card, .edu-card').forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 0.07 + 's';
});