
document.addEventListener('DOMContentLoaded', () => {
    initDynamicYear();
    initTypingEffect();
    init3DTilt();
    initCursorGlow();
    initRippleEffect();
    initCanvasParticles();
    initModalAndToast();
});

function initDynamicYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}


function initTypingEffect() {
    const textEl = document.getElementById('typing-text');
    if (!textEl) return;

    const titles = [
        "Frontend Engineer",
        "AI / ML Developer",
        "UI / UX Craftsman",
        "Full-Stack Creator"
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 100;
    const deleteSpeed = 50;
    const pauseDelay = 2000;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            textEl.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textEl.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentDelay = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentTitle.length) {
            currentDelay = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            currentDelay = 400;
        }

        setTimeout(type, currentDelay);
    }

    type();
}

// 3D Tilt Effect on Mouse Move
function init3DTilt() {
    const card = document.getElementById('portfolio-card');
    if (!card) return;

    const maxTilt = 12; 

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cardWidth = rect.width;
        const cardHeight = rect.height;

        // Calculate cursor position relative to card center (-1 to 1)
        const centerX = rect.left + cardWidth / 2;
        const centerY = rect.top + cardHeight / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation angles
        const rotateX = ((-mouseY / (cardHeight / 2)) * maxTilt).toFixed(2);
        const rotateY = ((mouseX / (cardWidth / 2)) * maxTilt).toFixed(2);

        // Apply smooth 3D transformation
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        // Reset card transformation with smooth animation transition
        card.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.3s ease';
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

        setTimeout(() => {
            card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        }, 500);
    });

    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
}

// Cursor-Follow Spotlight Glow
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let currentX = mouseX;
    let currentY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor interpolation using requestAnimationFrame
    function animateGlow() {
        currentX += (mouseX - currentX) * 0.15;
        currentY += (mouseY - currentY) * 0.15;

        glow.style.left = `${currentX}px`;
        glow.style.top = `${currentY}px`;

        requestAnimationFrame(animateGlow);
    }

    animateGlow();
}

// Button Ripple Animation
function initRippleEffect() {
    const buttons = document.querySelectorAll('.ripple-effect');

    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            const size = Math.max(rect.width, rect.height);
            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            // Remove existing ripples
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Pure Vanilla JS Interactive Canvas Particles
function initCanvasParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 55); 

    let mouse = {
        x: null,
        y: null,
        radius: 120
    };

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        createParticles();
    });

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 0.8;
            this.vy = (Math.random() - 0.5) * 0.8;
            this.color = Math.random() > 0.5 ? 'rgba(56, 189, 248, ' : 'rgba(192, 132, 252, ';
            this.alpha = Math.random() * 0.5 + 0.2;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = this.color + this.alpha + ')';
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color + '0.8)';
            ctx.fill();
            ctx.shadowBlur = 0; 
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            // Mouse proximity interaction
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const force = (mouse.radius - dist) / mouse.radius;
                    this.x -= Math.cos(angle) * force * 3;
                    this.y -= Math.sin(angle) * force * 3;
                }
            }

            this.draw();
        }
    }

    function createParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function connectParticles() {
        const maxDist = 110;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = (1 - dist / maxDist) * 0.25;
                    ctx.strokeStyle = `rgba(129, 140, 248, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function render() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => p.update());
        connectParticles();
        requestAnimationFrame(render);
    }

    createParticles();
    render();
}

// Toast & Contact Modal Interactions
function initModalAndToast() {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    const downloadBtn = document.getElementById('download-cv-btn');
    const contactBtn = document.getElementById('contact-btn');
    const emailBtn = document.getElementById('email-btn');

    const modal = document.getElementById('contact-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const contactForm = document.getElementById('contact-form');

    function showToast(message) {
        if (!toast || !toastMsg) return;
        toastMsg.textContent = message;
        toast.classList.add('active');

        setTimeout(() => {
            toast.classList.remove('active');
        }, 3200);
    }

    // Download Resume Action
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // Simulated resume download
            const blob = new Blob([
                `Daksh jain - RESUME\n\nFrontend Engineer & AI Developer\nEmail: daksh225j@gmail.com\nWebsite: https://alexmorgan.dev\n\nSkills: HTML5, CSS3, JavaScript (ES6+), React, Tailwind, Python, AI/ML Integrations.\n`
            ], { type: 'text/plain' });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Daksh_jain_Resume.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showToast("Resume download started!");
        });
    }

    // Open Contact Modal
    if (contactBtn && modal) {
        contactBtn.addEventListener('click', () => {
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
        });
    }

    // Close Modal
    if (modalClose && modal) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                modal.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Email Button Copy/Trigger
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText("daksh225j@gmail.com").then(() => {
                showToast("Email copied to clipboard!");
            }).catch(() => {
                window.location.href = "mailto:daksh225j@gmail.com";
            });
        });
    }

    // Contact Form Submit
    if (contactForm && modal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            contactForm.reset();
            showToast("Message sent successfully!");
        });
    }
}
