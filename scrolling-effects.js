// Scrolling Effects JavaScript

class ScrollingEffects {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupInfiniteScroll();
        this.setupParallaxEffects();
        this.setupCardInteractions();
        this.setupIntersectionObserver();
    }

    // Scroll-triggered animations
    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale');
        
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            animatedElements.forEach(element => {
                observer.observe(element);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            animatedElements.forEach(element => {
                element.classList.add('visible');
            });
        }
    }

    // Infinite scrolling for course cards
    setupInfiniteScroll() {
        const infiniteScrollContainers = document.querySelectorAll('.infinite-scroll-container');
        
        infiniteScrollContainers.forEach(container => {
            const scrollContent = container.querySelector('.infinite-scroll');
            if (!scrollContent) return;

            // Clone the content for seamless scrolling
            const originalContent = scrollContent.innerHTML;
            scrollContent.innerHTML = originalContent + originalContent;

            // Pause on hover
            container.addEventListener('mouseenter', () => {
                scrollContent.style.animationPlayState = 'paused';
            });

            container.addEventListener('mouseleave', () => {
                scrollContent.style.animationPlayState = 'running';
            });
        });
    }

    // Parallax scrolling effects
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        if (parallaxElements.length > 0) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                
                parallaxElements.forEach(element => {
                    const speed = element.dataset.speed || 0.5;
                    const yPos = -(scrolled * speed);
                    element.style.transform = `translateY(${yPos}px)`;
                });
            });
        }
    }

    // Advanced card interactions
    setupCardInteractions() {
        const courseCards = document.querySelectorAll('.course-card');
        
        courseCards.forEach(card => {
            // 3D tilt effect on mouse move
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });

            // Reset on mouse leave
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
            });

            // Ripple effect on click
            card.addEventListener('click', (e) => {
                const ripple = document.createElement('span');
                const rect = card.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                ripple.classList.add('ripple');
                
                card.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }

    // Intersection Observer for advanced animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: [0.1, 0.5, 0.9],
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                const ratio = entry.intersectionRatio;
                
                // Progressive animation based on visibility
                if (ratio > 0.1) {
                    element.style.opacity = ratio;
                    element.style.transform = `translateY(${(1 - ratio) * 30}px)`;
                }
                
                // Trigger special effects at different thresholds
                if (ratio > 0.5 && !element.classList.contains('half-visible')) {
                    element.classList.add('half-visible');
                    this.triggerSpecialEffect(element);
                }
                
                if (ratio > 0.9 && !element.classList.contains('fully-visible')) {
                    element.classList.add('fully-visible');
                    this.triggerFinalEffect(element);
                }
            });
        }, observerOptions);

        // Observe all course cards and sections
        const elementsToObserve = document.querySelectorAll('.course-card, .value-point, .testimonial-card');
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
    }

    // Special effects for half-visible elements
    triggerSpecialEffect(element) {
        // Add glow effect
        element.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.3)';
        
        // Add subtle pulse
        element.style.animation = 'pulse 2s ease-in-out';
        
        setTimeout(() => {
            element.style.boxShadow = '';
            element.style.animation = '';
        }, 2000);
    }

    // Final effects for fully visible elements
    triggerFinalEffect(element) {
        // Add celebration effect
        this.createConfetti(element);
        
        // Add completion badge
        if (element.classList.contains('course-card')) {
            this.addCompletionBadge(element);
        }
    }

    // Create confetti effect
    createConfetti(element) {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 10; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = rect.left + rect.width / 2 + 'px';
            confetti.style.top = rect.top + 'px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            document.body.appendChild(confetti);
            
            // Animate confetti
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: 'translateY(-100px) rotate(360deg)', opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            animation.onfinish = () => {
                confetti.remove();
            };
        }
    }

    // Add completion badge
    addCompletionBadge(element) {
        const badge = document.createElement('div');
        badge.innerHTML = '✨';
        badge.style.position = 'absolute';
        badge.style.top = '10px';
        badge.style.right = '10px';
        badge.style.fontSize = '20px';
        badge.style.animation = 'bounce 1s ease-in-out';
        
        element.appendChild(badge);
    }

    // Utility method to add ripple effect styles
    addRippleStyles() {
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple-animation 0.6s linear;
                    pointer-events: none;
                }
                
                @keyframes ripple-animation {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                @keyframes pulse {
                    0%, 100% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.05);
                    }
                }
                
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% {
                        transform: translate3d(0, 0, 0);
                    }
                    40%, 43% {
                        transform: translate3d(0, -10px, 0);
                    }
                    70% {
                        transform: translate3d(0, -5px, 0);
                    }
                    90% {
                        transform: translate3d(0, -2px, 0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize scrolling effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollingEffects();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollingEffects;
}