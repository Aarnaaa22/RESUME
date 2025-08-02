// Smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate sections on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(section);
    });
});

// Skill tags hover effect with random colors
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag');
    const colors = [
        'linear-gradient(135deg, #ff6b9d, #c44eb1)',
        'linear-gradient(135deg, #667eea, #764ba2)',
        'linear-gradient(135deg, #f093fb, #f5576c)',
        'linear-gradient(135deg, #4facfe, #00f2fe)',
        'linear-gradient(135deg, #43e97b, #38f9d7)'
    ];
    
    skillTags.forEach(tag => {
        const originalBackground = tag.style.background || 'linear-gradient(135deg, #ff6b9d, #c44eb1)';
        
        tag.addEventListener('mouseenter', () => {
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            tag.style.background = randomColor;
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.background = originalBackground;
        });
    });
});

// Typing effect for the name
document.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.querySelector('.name');
    const originalText = nameElement.textContent;
    nameElement.textContent = '';
    
    let index = 0;
    const typeWriter = () => {
        if (index < originalText.length) {
            nameElement.textContent += originalText.charAt(index);
            index++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 500);
});

// Floating particles background effect
document.addEventListener('DOMContentLoaded', () => {
    createFloatingParticles();
});

function createFloatingParticles() {
    const particleCount = 15;
    const body = document.body;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: radial-gradient(circle, rgba(255,107,157,0.6), rgba(196,78,177,0.3));
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            left: ${Math.random() * 100}vw;
            top: ${Math.random() * 100}vh;
            animation: float ${15 + Math.random() * 20}s infinite linear;
        `;
        
        body.appendChild(particle);
    }
    
    // Add CSS animation for floating particles
    if (!document.getElementById('particle-styles')) {
        const style = document.createElement('style');
        style.id = 'particle-styles';
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Contact item click effects
document.addEventListener('DOMContentLoaded', () => {
    const contactItems = document.querySelectorAll('.contact-item');
    
    contactItems.forEach(item => {
        item.addEventListener('click', () => {
            const span = item.querySelector('span');
            const text = span.textContent;
            
            if (text.includes('@')) {
                // Email
                window.location.href = `mailto:${text}`;
            } else if (text.match(/^\d+$/)) {
                // Phone number
                window.location.href = `tel:${text}`;
            }
            
            // Visual feedback
            item.style.transform = 'scale(0.95)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
        });
        
        item.style.cursor = 'pointer';
        item.style.transition = 'transform 0.15s ease';
    });
});

// Section expand/collapse functionality
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        const content = section.querySelector('.section-title').nextElementSibling;
        
        title.style.cursor = 'pointer';
        title.addEventListener('click', () => {
            const isCollapsed = section.classList.contains('collapsed');
            
            if (isCollapsed) {
                section.classList.remove('collapsed');
                section.style.maxHeight = 'none';
                title.querySelector('i').style.transform = 'rotate(0deg)';
            } else {
                section.classList.add('collapsed');
                section.style.maxHeight = '80px';
                title.querySelector('i').style.transform = 'rotate(180deg)';
            }
        });
        
        // Add transition for smooth collapse/expand
        section.style.transition = 'max-height 0.3s ease, padding 0.3s ease';
        title.querySelector('i').style.transition = 'transform 0.3s ease';
    });
});

// Progress bar animation for skills (if you want to add this later)
function animateSkillBars() {
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.transform = 'scale(1.05)';
            setTimeout(() => {
                tag.style.transform = 'scale(1)';
            }, 200);
        }, index * 100);
    });
}

// Call skill animation when skills section is visible
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(animateSkillBars, 500);
                skillsObserver.unobserve(entry.target);
            }
        });
    });
    
    skillsObserver.observe(skillsSection);
}

// Add subtle mouse tracking effect to header
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    
    document.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            
            header.style.background = `
                radial-gradient(circle at ${xPercent}% ${yPercent}%, 
                rgba(255,255,255,0.1) 0%, 
                transparent 50%), 
                linear-gradient(135deg, #ff6b9d, #c44eb1)
            `;
        }
    });
    
    header.addEventListener('mouseleave', () => {
        header.style.background = 'linear-gradient(135deg, #ff6b9d, #c44eb1)';
    });
});