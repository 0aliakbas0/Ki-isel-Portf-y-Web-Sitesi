document.addEventListener('DOMContentLoaded', function() {
    addScrollAnimation();
    addSmoothScroll();
    initContactModal();
});

function addScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    const sections = document.querySelectorAll('.section, .project-card');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function addSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initContactModal() {
    const modal = document.getElementById('contactModal');
    if (!modal) {
        return;
    }

    const openButtons = document.querySelectorAll('[data-contact-modal]');
    const closeBtn = modal.querySelector('[data-close-modal]');
    const backdrop = modal.querySelector('.contact-backdrop');
    const mailShortcut = modal.querySelector('[data-mailto-close]');
    const email = modal.dataset.email || '41aliakbas@gmail.com';

    const showModal = () => {
        modal.removeAttribute('hidden');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        requestAnimationFrame(() => modal.classList.add('visible'));
    };

    const hideModal = () => {
        modal.classList.remove('visible');
        setTimeout(() => {
            if (!modal.classList.contains('visible')) {
                modal.setAttribute('hidden', '');
            }
        }, 200);
    };

    const handleMail = (event) => {
        event?.preventDefault();
        window.location.href = `mailto:${email}`;
        hideModal();
    };

    openButtons.forEach(btn => {
        btn.addEventListener('click', showModal);
    });

    [closeBtn, backdrop].forEach(el => el?.addEventListener('click', hideModal));

    mailShortcut?.addEventListener('click', handleMail);

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !modal.hasAttribute('hidden')) {
            hideModal();
        }
    });
}
