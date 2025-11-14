const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');
const sections = document.querySelectorAll('section');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

const activePage = () => {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    if (header) {
        header.classList.remove('active');
        setTimeout(() => {
            header.classList.add('active');
        }, 0);
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
    });

    if (barsBox) {
        barsBox.classList.remove('active');
        setTimeout(() => {
            barsBox.classList.add('active');
        }, 0);
    }

    sections.forEach(section => {
        section.classList.remove('active');
    });

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Handle navbar clicks
navLinks.forEach((link, idx) => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // If this is an internal hash link (e.g., #home, #education...)
        if (href && href.startsWith('#')) {
            e.preventDefault();
        }

        if (!link.classList.contains('active')) {
            activePage();
        }

        link.classList.add('active');

        // Show the section corresponding to this link index
        setTimeout(() => {
            if (sections[idx]) {
                sections[idx].classList.add('active');
            }
        }, 0);

        // Update URL hash so refresh/direct link keeps the same "page"
        if (href && href.startsWith('#')) {
            // Use replaceState to avoid adding history entries on every click
            history.replaceState(null, '', href);
        }
    });
});

// Logo → go to first section (Home)
if (logoLink) {
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();

        if (navLinks.length === 0 || sections.length === 0) return;

        if (!navLinks[0].classList.contains('active')) {
            activePage();
        }

        navLinks[0].classList.add('active');

        setTimeout(() => {
            sections[0].classList.add('active');
        }, 0);

        const firstHref = navLinks[0].getAttribute('href');
        if (firstHref && firstHref.startsWith('#')) {
            history.replaceState(null, '', firstHref);
        } else {
            history.replaceState(null, '', '#home');
        }
    });
}

// On page load, respect the URL hash and activate the correct section + nav link
window.addEventListener('load', () => {
    const hash = window.location.hash;

    if (!hash) return; // No hash → keep default Home behavior

    // Find which nav link corresponds to this hash
    let targetIndex = -1;
    navLinks.forEach((link, idx) => {
        if (link.getAttribute('href') === hash) {
            targetIndex = idx;
        }
    });

    if (targetIndex !== -1 && sections[targetIndex]) {
        // Clear existing active states
        sections.forEach(section => section.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // Activate matching section + nav link
        sections[targetIndex].classList.add('active');
        navLinks[targetIndex].classList.add('active');
    }
});
