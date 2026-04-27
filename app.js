document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();



    // 3. Header Scroll Effect
    const header = document.getElementById('navbar');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
                } else {
                    header.style.boxShadow = 'none';
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // 4. Scroll Reveal Animation using IntersectionObserver
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 5. Mobile Menu Toggle (Basic Implementation)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navCta = document.querySelector('.nav-cta');
    
    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            const navMenu = document.getElementById('nav-menu');
            navMenu.classList.toggle('active');
            mobileBtn.classList.toggle('active'); // For the hamburger animation if added later
        });
        
        // Close menu when clicking a link
        const navLinksList = document.querySelectorAll('.nav-links a');
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                document.getElementById('nav-menu').classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const navMenu = document.getElementById('nav-menu');
            const mobileBtn = document.querySelector('.mobile-menu-btn');
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !mobileBtn.contains(e.target)) {
                navMenu.classList.remove('active');
            }
        });
    }

    // 6. Interactive Image Accordion Logic
    const accordionItems = document.querySelectorAll('.accordion-item');
    if (accordionItems.length > 0) {
        accordionItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                // Remove active class from all items
                accordionItems.forEach(i => i.classList.remove('active'));
                // Add active class to the hovered item
                item.classList.add('active');
            });
        });
    }

    // 7. About Section "Read More" Toggle
    const readMoreBtn = document.getElementById('read-more-btn');
    const moreContent = document.querySelector('.about-more-content');
    
    if (readMoreBtn && moreContent) {
        readMoreBtn.addEventListener('click', () => {
            const isExpanded = moreContent.classList.toggle('expanded');
            readMoreBtn.textContent = isExpanded ? 'Read Less' : 'Read More';
        });
    }
});
