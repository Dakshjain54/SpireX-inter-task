document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
       1. Dynamic Current Year in Footer
       -------------------------------------------------------------------------- */
    const currentYearEl = document.getElementById('current-year');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    /* --------------------------------------------------------------------------
       2. Sticky Navigation Bar & Header Shadow on Scroll
       -------------------------------------------------------------------------- */
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Add shadow/compact state to header
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Show/hide Back-to-Top button
        if (scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* --------------------------------------------------------------------------
       3. Back to Top Button Click Event
       -------------------------------------------------------------------------- */
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* --------------------------------------------------------------------------
       4. Mobile Navigation Menu Toggle (Hamburger & Close)
       -------------------------------------------------------------------------- */
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        const toggleMenu = () => {
            const isActive = navMenu.classList.toggle('active');
            hamburgerIcon.style.display = isActive ? 'none' : 'block';
            closeIcon.style.display = isActive ? 'block' : 'none';
            document.body.style.overflow = isActive ? 'hidden' : '';
        };

        navToggle.addEventListener('click', toggleMenu);

        // Close mobile menu when clicking any nav link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
    }

    /* --------------------------------------------------------------------------
       5. Active Navigation Link Highlighting on Scroll (IntersectionObserver)
       -------------------------------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');

    const navObserverOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0
    };

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, navObserverOptions);

    sections.forEach(section => navObserver.observe(section));

    /* --------------------------------------------------------------------------
       6. Skill Bar Progress Fill Animation
       -------------------------------------------------------------------------- */
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    const skillObserverOptions = {
        root: null,
        threshold: 0.2
    };

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fillBar = entry.target;
                const targetWidth = fillBar.getAttribute('data-level');
                fillBar.style.width = targetWidth;
                observer.unobserve(fillBar); // Animate only once
            }
        });
    }, skillObserverOptions);

    skillBars.forEach(bar => skillObserver.observe(bar));

    /* --------------------------------------------------------------------------
       7. Scroll Reveal Animation for Section Cards (fade-in-up)
       -------------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealObserverOptions = {
        root: null,
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => revealObserver.observe(element));

    /* --------------------------------------------------------------------------
       8. Interactive Smooth Scroll Offset Adjuster
       -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Daksh Jain Resume Portfolio initialized successfully.');
});
