/* =========================================
   1. CONTACT FORM AJAX + INLINE NOTIFICATION (FINAL)
   ========================================= */
const contactForm = document.getElementById('contactForm');
const formNotification = document.getElementById('form-notification');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const originalText = submitBtn.textContent;
    submitBtn.textContent = currentLang === 'id' ? 'Mengirim...' : 'Sending...';
    submitBtn.disabled = true;
    formNotification.className = 'form-notification'; 

    const formData = new FormData(contactForm);

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const msg = currentLang === 'id' 
                ? '✅ Pesan berhasil dikirim! Saya akan segera membalas.' 
                : '✅ Message sent successfully! I will reply shortly.';
            
            formNotification.textContent = msg;
            formNotification.classList.add('success', 'show');
            contactForm.reset();
        } else {
            throw new Error('Server error');
        }
    } catch (error) {
        const msg = currentLang === 'id' 
            ? '❌ Terjadi kesalahan. Silakan coba lagi atau hubungi via email.' 
            : '❌ An error occurred. Please try again or contact via email.';
        
        formNotification.textContent = msg;
        formNotification.classList.add('error', 'show');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;

        setTimeout(() => {
            formNotification.classList.remove('show');
            setTimeout(() => {
                formNotification.className = 'form-notification'; 
            }, 400);
        }, 4000);
    }
});

/* =========================================
   2. MOBILE MENU TOGGLE
   ========================================= */
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

/* =========================================
   3. LANGUAGE TOGGLE (EN / ID) - REVISED
   ========================================= */
let currentLang = 'en'; 
const langToggleBtn = document.getElementById('lang-toggle');
const langText = langToggleBtn.querySelector('.lang-text');
const translatableElements = document.querySelectorAll('[data-en][data-id]');

langToggleBtn.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'id' : 'en';
    
    if (langText) {
        langText.textContent = currentLang === 'en' ? 'ID' : 'EN';
    }
    
    translatableElements.forEach(el => {
        el.innerHTML = el.getAttribute(`data-${currentLang}`);
    });

    document.documentElement.lang = currentLang;
});

/* =========================================
   4. SMOOTH SCROLL & ACTIVE NAV LINK
   ========================================= */
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

/* =========================================
   5. SCROLL REVEAL ANIMATION (Ringan)
   ========================================= */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const animateElements = document.querySelectorAll('.project-card, .stat-card, .skill-category, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

document.getElementById('copyright-year').textContent = new Date().getFullYear();