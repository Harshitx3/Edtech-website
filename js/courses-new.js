document.addEventListener('DOMContentLoaded', () => {
    const courses = [
        {
            "id": 1,
            "title": "Full-Stack Web Development",
            "instructor": "Dr. Anjali Sharma",
            "price": 4999,
            "original_price": 9999,
            "duration": 24,
            "level": "Intermediate",
            "rating": 4.8,
            "reviews": 1200,
            "image": "https://via.placeholder.com/300x200",
            "category": "Web Development"
        },
        {
            "id": 2,
            "title": "Data Science with Python",
            "instructor": "Prof. Vikram Singh",
            "price": 5999,
            "original_price": 11999,
            "duration": 36,
            "level": "Advanced",
            "rating": 4.9,
            "reviews": 2500,
            "image": "https://via.placeholder.com/300x200",
            "category": "Data Science"
        },
        {
            "id": 3,
            "title": "React Native Mobile Development",
            "instructor": "Priya Mehta",
            "price": 3999,
            "original_price": 7999,
            "duration": 20,
            "level": "Intermediate",
            "rating": 4.7,
            "reviews": 850,
            "image": "https://via.placeholder.com/300x200",
            "category": "Mobile Development"
        },
        {
            "id": 4,
            "title": "Machine Learning A-Z",
            "instructor": "Dr. Rajesh Kumar",
            "price": 7999,
            "original_price": 15999,
            "duration": 48,
            "level": "Advanced",
            "rating": 4.9,
            "reviews": 3200,
            "image": "https://via.placeholder.com/300x200",
            "category": "Data Science"
        },
        {
            "id": 5,
            "title": "UI/UX Design Fundamentals",
            "instructor": "Sneha Patel",
            "price": 3499,
            "original_price": 6999,
            "duration": 16,
            "level": "Beginner",
            "rating": 4.8,
            "reviews": 1500,
            "image": "https://via.placeholder.com/300x200",
            "category": "Design"
        },
        {
            "id": 6,
            "title": "Cybersecurity Essentials",
            "instructor": "Arjun Reddy",
            "price": 6999,
            "original_price": 13999,
            "duration": 40,
            "level": "Intermediate",
            "rating": 4.8,
            "reviews": 1900,
            "image": "https://via.placeholder.com/300x200",
            "category": "Security"
        },
        {
            "id": 7,
            "title": "AWS Cloud Practitioner",
            "instructor": "Rahul Verma",
            "price": 4499,
            "original_price": 8999,
            "duration": 18,
            "level": "Beginner",
            "rating": 4.6,
            "reviews": 1100,
            "image": "https://via.placeholder.com/300x200",
            "category": "Cloud Computing"
        },
        {
            "id": 8,
            "title": "DevOps Engineering Masterclass",
            "instructor": "Suresh Iyer",
            "price": 6499,
            "original_price": 12999,
            "duration": 32,
            "level": "Advanced",
            "rating": 4.7,
            "reviews": 1800,
            "image": "https://via.placeholder.com/300x200",
            "category": "Web Development"
        },
        {
            "id": 9,
            "title": "Blockchain Development",
            "instructor": "Amit Desai",
            "price": 8999,
            "original_price": 17999,
            "duration": 28,
            "level": "Advanced",
            "rating": 4.5,
            "reviews": 650,
            "image": "https://via.placeholder.com/300x200",
            "category": "Web Development"
        },
        {
            "id": 10,
            "title": "Flutter App Development",
            "instructor": "Neha Kapoor",
            "price": 3799,
            "original_price": 7599,
            "duration": 22,
            "level": "Intermediate",
            "rating": 4.6,
            "reviews": 920,
            "image": "https://via.placeholder.com/300x200",
            "category": "Mobile Development"
        }
    ];

    const courseGrid = document.getElementById('course-grid');
    const searchInput = document.getElementById('courseSearch');
    const sortSelect = document.getElementById('sortBy');
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('maxPrice');
    const durationFilters = document.querySelectorAll('input[name="duration"]');
    const levelFilters = document.querySelectorAll('input[name="level"]');
    const purchaseModal = document.getElementById('purchase-modal');
    const successModal = document.getElementById('success-modal');
    const closeModalButtons = document.querySelectorAll('.close-button');
    const purchaseForm = document.getElementById('purchase-form');
    const courseTitleInput = document.getElementById('course-title');
    const coursePriceInput = document.getElementById('course-price');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    const renderCourses = (filteredCourses) => {
        courseGrid.innerHTML = '';
        if (filteredCourses.length === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }
        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <img src="${course.image}" alt="${course.title}">
                <div class="course-info">
                    <h3>${course.title}</h3>
                    <p class="instructor">By ${course.instructor}</p>
                    <div class="rating">
                        ${getStarRating(course.rating)}
                        <span>${course.rating} (${course.reviews} reviews)</span>
                    </div>
                    <div class="price">
                        <span class="current-price">₹${course.price.toLocaleString()}</span>
                        <span class="original-price">₹${course.original_price.toLocaleString()}</span>
                    </div>
                    <button class="purchase-button" data-id="${course.id}">Buy Now</button>
                </div>
            `;
            courseGrid.appendChild(courseCard);
        });

        document.querySelectorAll('.purchase-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const courseId = parseInt(e.target.dataset.id);
                const course = courses.find(c => c.id === courseId);
                courseTitleInput.value = course.title;
                coursePriceInput.value = `₹${course.price.toLocaleString()}`;
                purchaseModal.style.display = 'flex';
            });
        });
    };

    const getStarRating = (rating) => {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i - 0.5 <= rating) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        return stars;
    };

    const filterCourses = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategories = Array.from(categoryFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const maxPriceValue = parseInt(priceRange.value);
        const selectedDurations = Array.from(durationFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        const selectedLevels = Array.from(levelFilters)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        let filteredCourses = courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                                course.instructor.toLowerCase().includes(searchTerm) ||
                                course.category.toLowerCase().includes(searchTerm);
            
            const matchesCategory = selectedCategories.length === 0 || 
                                   selectedCategories.includes(course.category);
            
            const matchesPrice = course.price <= maxPriceValue;
            
            const matchesDuration = selectedDurations.length === 0 ||
                                   selectedDurations.some(duration => {
                                       if (duration === '0-10') return course.duration <= 10;
                                       if (duration === '10-20') return course.duration > 10 && course.duration <= 20;
                                       if (duration === '20-30') return course.duration > 20 && course.duration <= 30;
                                       if (duration === '30+') return course.duration > 30;
                                       return true;
                                   });
            
            const matchesLevel = selectedLevels.length === 0 ||
                                selectedLevels.includes(course.level);
            
            return matchesSearch && matchesCategory && matchesPrice && matchesDuration && matchesLevel;
        });

        // Sort courses
        const sortBy = sortSelect.value;
        filteredCourses.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'newest':
                    return b.id - a.id;
                default:
                    return 0;
            }
        });

        renderCourses(filteredCourses);
        resultsCount.textContent = `${filteredCourses.length} courses found`;
    };

    // Event listeners
    searchInput.addEventListener('input', filterCourses);
    sortSelect.addEventListener('change', filterCourses);
    categoryFilters.forEach(cb => cb.addEventListener('change', filterCourses));
    priceRange.addEventListener('input', (e) => {
        priceValue.textContent = `₹${parseInt(e.target.value).toLocaleString()}`;
        filterCourses();
    });
    durationFilters.forEach(cb => cb.addEventListener('change', filterCourses));
    levelFilters.forEach(cb => cb.addEventListener('change', filterCourses));

    document.getElementById('clearFilters').addEventListener('click', () => {
        searchInput.value = '';
        categoryFilters.forEach(cb => cb.checked = false);
        priceRange.value = 20000;
        priceValue.textContent = '₹20,000';
        durationFilters.forEach(cb => cb.checked = false);
        levelFilters.forEach(cb => cb.checked = false);
        sortSelect.value = 'relevance';
        filterCourses();
    });

    // Modal functionality
    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            purchaseModal.style.display = 'none';
            successModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === purchaseModal) {
            purchaseModal.style.display = 'none';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    document.querySelector('.cancel-button').addEventListener('click', () => {
        purchaseModal.style.display = 'none';
    });

    // Form submission
    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const education = document.getElementById('education').value;
        const experience = document.getElementById('experience').value;
        const goals = document.getElementById('goals').value.trim();
        const terms = document.getElementById('terms').checked;
        
        // Validation
        if (!fullName || !email || !phone || !terms) {
            alert('Please fill in all required fields and accept the terms.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Phone validation (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone) || phone.length < 10) {
            alert('Please enter a valid phone number.');
            return;
        }
        
        // Simulate form submission
        setTimeout(() => {
            purchaseModal.style.display = 'none';
            successModal.style.display = 'flex';
            
            // Reset form
            purchaseForm.reset();
            
            // Log enrollment data (in real app, this would be sent to server)
            console.log('Enrollment Data:', {
                course: courseTitleInput.value,
                price: coursePriceInput.value,
                fullName,
                email,
                phone,
                education,
                experience,
                goals,
                timestamp: new Date().toISOString()
            });
        }, 1000);
    });

    // Close success modal function
    window.closeSuccessModal = () => {
        successModal.style.display = 'none';
    };

    // Initial render
    renderCourses(courses);
    resultsCount.textContent = `${courses.length} courses found`;

    const filterAndSortCourses = () => {
        let filteredCourses = [...courses];
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategories = Array.from(categoryFilters).filter(c => c.checked).map(c => c.value);
        const maxPrice = parseInt(priceRange.value);
        const selectedDurations = Array.from(durationFilters).filter(d => d.checked).map(d => d.value);
        const selectedLevels = Array.from(levelFilters).filter(l => l.checked).map(l => l.value);

        // Search
        if (searchTerm) {
            filteredCourses = filteredCourses.filter(course =>
                course.title.toLowerCase().includes(searchTerm) ||
                course.instructor.toLowerCase().includes(searchTerm)
            );
        }

        // Category
        if (selectedCategories.length > 0) {
            filteredCourses = filteredCourses.filter(course => selectedCategories.includes(course.category));
        }

        // Price
        filteredCourses = filteredCourses.filter(course => course.price <= maxPrice);

        // Duration
        if (selectedDurations.length > 0) {
            filteredCourses = filteredCourses.filter(course => {
                return selectedDurations.some(duration => {
                    const [min, max] = duration.split('-').map(Number);
                    return course.duration >= min && course.duration <= (max || Infinity);
                });
            });
        }

        // Level
        if (selectedLevels.length > 0) {
            filteredCourses = filteredCourses.filter(course => selectedLevels.includes(course.level));
        }

        // Sort
        const sortOption = sortSelect.value;
        if (sortOption === 'price-low') {
            filteredCourses.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-high') {
            filteredCourses.sort((a, b) => b.price - a.price);
        } else if (sortOption === 'rating') {
            filteredCourses.sort((a, b) => b.rating - a.rating);
        } else if (sortOption === 'newest') {
            filteredCourses.sort((a, b) => b.id - a.id);
        }

        // Update results count
        resultsCount.textContent = `Showing ${filteredCourses.length} courses`;
        
        renderCourses(filteredCourses);
    };

    const debounce = (func, delay) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), delay);
        };
    };

    searchInput.addEventListener('input', debounce(filterAndSortCourses, 300));
    sortSelect.addEventListener('change', filterAndSortCourses);
    priceRange.addEventListener('input', () => {
        priceValue.textContent = `₹${parseInt(priceRange.value).toLocaleString()}`;
        filterAndSortCourses();
    });

    categoryFilters.forEach(cat => cat.addEventListener('change', filterAndSortCourses));
    durationFilters.forEach(filter => filter.addEventListener('change', filterAndSortCourses));
    levelFilters.forEach(filter => filter.addEventListener('change', filterAndSortCourses));

    // Clear filters functionality
    document.getElementById('clearFilters').addEventListener('click', () => {
        searchInput.value = '';
        sortSelect.value = 'popularity';
        priceRange.value = 50000;
        priceValue.textContent = '₹50,000';
        
        categoryFilters.forEach(cat => cat.checked = true);
        durationFilters.forEach(filter => filter.checked = filter.value === 'all');
        levelFilters.forEach(filter => filter.checked = true);
        
        filterAndSortCourses();
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            purchaseModal.style.display = 'none';
            successModal.style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === purchaseModal) {
            purchaseModal.style.display = 'none';
        }
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    purchaseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically handle the payment processing
        purchaseModal.style.display = 'none';
        successModal.style.display = 'flex';
    });

    // Initial render
    priceValue.textContent = `₹${parseInt(priceRange.value).toLocaleString()}`;
    renderCourses(courses);
});