// Testimonials Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling animation for testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide cards and observe them
    testimonialCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
    
    // Add click tracking for statistics
    const stats = document.querySelectorAll('.stat');
    stats.forEach(stat => {
        stat.addEventListener('click', function() {
            // Add a pulse effect when clicked
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
    
    // Add hover effects for testimonial cards
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Filter functionality (can be extended)
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                filterTestimonials(filter);
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
    
    // Function to filter testimonials (placeholder for future enhancement)
    function filterTestimonials(filter) {
        const cards = document.querySelectorAll('.testimonial-card');
        
        cards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    // Add testimonial submission functionality (for future)
    const submitTestimonialBtn = document.querySelector('.submit-testimonial-btn');
    if (submitTestimonialBtn) {
        submitTestimonialBtn.addEventListener('click', function() {
            // Placeholder for testimonial submission form
            alert('Testimonial submission feature coming soon!');
        });
    }
    
    // Counter animation for statistics
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.ceil(current);
            }
        }, 20);
    }
    
    // Animate statistics when they come into view
    const statValues = document.querySelectorAll('.stat-value');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                
                // Check if it's a salary figure
                if (text.includes('LPA')) {
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    if (!element.classList.contains('animated')) {
                        element.classList.add('animated');
                        element.textContent = '0';
                        setTimeout(() => {
                            animateCounter(element, number);
                            setTimeout(() => {
                                element.textContent = '₹' + number + ' LPA';
                            }, 2000);
                        }, 500);
                    }
                }
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => {
        statObserver.observe(stat);
    });
});

// Utility function to add more testimonials dynamically
function addTestimonial(testimonialData) {
    const container = document.querySelector('.testimonials-container');
    const newCard = document.createElement('div');
    newCard.className = 'testimonial-card';
    newCard.setAttribute('data-category', testimonialData.category);
    
    newCard.innerHTML = `
        <div class="testimonial-header">
            <img src="${testimonialData.image}" alt="${testimonialData.name}" class="testimonial-avatar">
            <div class="testimonial-info">
                <h3>${testimonialData.name}</h3>
                <p class="testimonial-location">${testimonialData.location}</p>
                <p class="testimonial-course">${testimonialData.course}</p>
            </div>
        </div>
        <div class="testimonial-content">
            <div class="rating">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <blockquote>
                "${testimonialData.quote}"
            </blockquote>
            <div class="testimonial-stats">
                <div class="stat">
                    <span class="stat-value">${testimonialData.salary}</span>
                    <span class="stat-label">Package</span>
                </div>
                <div class="stat">
                    <span class="stat-value">${testimonialData.duration}</span>
                    <span class="stat-label">Learning Time</span>
                </div>
            </div>
        </div>
    `;
    
    container.appendChild(newCard);
    
    // Add animation to new card
    setTimeout(() => {
        newCard.style.opacity = '1';
        newCard.style.transform = 'translateY(0)';
    }, 100);
}

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addTestimonial };
}