document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Smooth Scrolling for Navigation Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 3. Header Scroll Effect
    const header = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.05)';
            header.style.padding = '0';
        } else {
            header.style.boxShadow = 'none';
        }
    });

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
            // Simplified toggle for demonstration, an actual implementation might use a slide-down menu
            if(navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                navCta.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#fff';
                navLinks.style.padding = '1rem';
                navLinks.style.boxShadow = '0 10px 15px -3px rgba(0,0,0,0.1)';
                
                navCta.style.display = 'block';
                navCta.style.position = 'absolute';
                navCta.style.top = '250px';
                navCta.style.left = '1rem';
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
