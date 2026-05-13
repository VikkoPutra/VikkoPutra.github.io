document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year in Footer (null-guarded — safe on all pages)
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 2. Header Scroll Shadow Effect (only transition box-shadow, not all properties)
    const header = document.getElementById('navbar');
    if (header) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    header.style.boxShadow = window.scrollY > 50
                        ? '0 4px 6px -1px rgba(0,0,0,0.07)'
                        : 'none';
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // 3. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    if (revealElements.length > 0) {
        const revealOptions = {
            threshold: 0.05, // Lowered from 0.15 for smoother mobile reveal
            rootMargin: '0px 0px -40px 0px'
        };

        const revealOnScroll = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => revealOnScroll.observe(el));
    }

    // 4. Mobile Menu Toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');

    if (mobileBtn) {
        const getNavMenu = () => document.getElementById('nav-menu');

        mobileBtn.addEventListener('click', () => {
            const navMenu = getNavMenu();
            navMenu.classList.toggle('active');
            mobileBtn.classList.toggle('active');
            // Prevent body scroll when menu is open
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                getNavMenu().classList.remove('active');
                mobileBtn.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = getNavMenu();
            if (
                navMenu.classList.contains('active') &&
                !navMenu.contains(e.target) &&
                !mobileBtn.contains(e.target)
            ) {
                navMenu.classList.remove('active');
                mobileBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const navMenu = getNavMenu();
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileBtn.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    }

    // 5. Interactive Image Accordion — desktop (mouseenter) + mobile (click/touch)
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        const activateItem = (item) => {
            accordionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
        };

        accordionItems.forEach(item => {
            // Desktop: hover
            item.addEventListener('mouseenter', () => activateItem(item));

            // Mobile: tap — only fires if NOT a mouse event to avoid double-firing
            item.addEventListener('click', (e) => {
                // On touch devices, click fires after touchend. This is sufficient.
                activateItem(item);
            });
        });
    }

    // 6. About Section "Read More" Toggle
    const readMoreBtn = document.getElementById('read-more-btn');
    const moreContent = document.querySelector('.about-more-content');

    if (readMoreBtn && moreContent) {
        readMoreBtn.addEventListener('click', () => {
            const isExpanded = moreContent.classList.toggle('expanded');
            readMoreBtn.textContent = isExpanded ? 'Read Less' : 'Read More';
        });
    }
});
