/* ====================================
   PORTFOLIO WEBSITE — SCRIPT.JS
   Animations, Navigation, & Interactivity
   ==================================== */

// ===== Typewriter Effect =====
const typewriterPhrases = [
    'full-stack applications.',
    'AI-powered tools.',
    'beautiful interfaces.',
    'real-time systems.',
    'the future.'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriterText');

function typewrite() {
    const currentPhrase = typewriterPhrases[phraseIndex];

    if (isDeleting) {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let timeout = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentPhrase.length) {
        timeout = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % typewriterPhrases.length;
        timeout = 400;
    }

    setTimeout(typewrite, timeout);
}

typewrite();

// ===== Particle Background =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const count = 40;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = 6 + Math.random() * 6 + 's';
        particle.style.width = 1 + Math.random() * 3 + 'px';
        particle.style.height = particle.style.width;
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

function handleNavScroll() {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleNavScroll);

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scrollY = window.scrollY + 150;

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + id) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Mobile Navigation Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinksContainer = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
});

// Close mobile nav on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('open');
    });
});

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const cards = document.querySelectorAll('.glass-card, .section-header');

    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.85;

        if (cardTop < triggerPoint) {
            card.classList.add('visible');
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
}

// Initial state for reveal
document.querySelectorAll('.glass-card, .section-header').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i % 4 * 0.1}s, transform 0.6s ease ${i % 4 * 0.1}s`;
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ===== Skill Bar Animation =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;

        if (barTop < window.innerHeight * 0.9) {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// ===== Counter Animation =====
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const current = parseInt(counter.textContent);

        if (current < target) {
            const counterTop = counter.getBoundingClientRect().top;

            if (counterTop < window.innerHeight) {
                let count = 0;
                const duration = 1500;
                const step = target / (duration / 30);

                const timer = setInterval(() => {
                    count += step;
                    if (count >= target) {
                        counter.textContent = target + '+';
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(count);
                    }
                }, 30);
            }
        }
    });
}

window.addEventListener('scroll', animateCounters);
window.addEventListener('load', animateCounters);

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Create mailto link as fallback
    const mailtoLink = `mailto:YOUR_EMAIL@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`;

    window.location.href = mailtoLink;

    // Show success feedback
    const btn = contactForm.querySelector('button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #28c840, #2ecc71)';

    setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ===== Smooth Scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Hero Name Glow on Mouse Move =====
const heroName = document.getElementById('heroName');
if (heroName) {
    document.addEventListener('mousemove', (e) => {
        const rect = heroName.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        heroName.style.backgroundPosition = `${x}% ${y}%`;
    });
}

console.log('%c👋 Welcome to my portfolio!', 'color: #6C63FF; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Balaji Reddy Pothapu', 'color: #9898b0; font-size: 14px;');
