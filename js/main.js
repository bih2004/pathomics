// Pathomics Website - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle hamburger animation
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Mobile Dropdown Toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        
        if (window.innerWidth <= 767) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.navbar') && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Sticky Header
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerOffset = header.offsetHeight;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        hamburger.classList.remove('active');
                        navMenu.classList.remove('active');
                        
                        const spans = hamburger.querySelectorAll('span');
                        spans[0].style.transform = 'none';
                        spans[1].style.opacity = '1';
                        spans[2].style.transform = 'none';
                    }
                }
            }
        });
    });
    
    // Form validation for contact form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (!nameInput.value.trim()) {
                displayError(nameInput, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
                displayError(emailInput, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!messageInput.value.trim()) {
                displayError(messageInput, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message (in a real implementation, this would submit the form)
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
                contactForm.appendChild(successMessage);
                
                // Reset form
                contactForm.reset();
                
                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        function displayError(input, message) {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.875rem';
            errorMessage.style.marginTop = '5px';
            
            input.parentNode.appendChild(errorMessage);
            input.style.borderColor = 'red';
            
            input.addEventListener('input', function() {
                errorMessage.remove();
                input.style.borderColor = '';
            }, { once: true });
        }
    }
    
    // Service comparison tool (if exists)
    const comparisonTool = document.getElementById('serviceComparison');
    
    if (comparisonTool) {
        const checkboxes = comparisonTool.querySelectorAll('input[type="checkbox"]');
        const compareButton = document.getElementById('compareButton');
        const comparisonResults = document.getElementById('comparisonResults');
        
        compareButton.addEventListener('click', function() {
            const selectedServices = [];
            
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedServices.push(checkbox.value);
                }
            });
            
            if (selectedServices.length < 2) {
                alert('Please select at least 2 services to compare');
                return;
            }
            
            // In a real implementation, this would fetch comparison data
            // For now, we'll just show which services were selected
            comparisonResults.innerHTML = `
                <h3>Comparison Results</h3>
                <p>You selected: ${selectedServices.join(', ')}</p>
                <p>This is where detailed comparison information would appear.</p>
            `;
            
            comparisonResults.style.display = 'block';
        });
    }
    
    // FAQ accordions
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            const answer = item.querySelector('.faq-answer');
            const isOpen = answer.style.maxHeight;
            
            // Close all other answers
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current answer
            if (isOpen) {
                answer.style.maxHeight = null;
                item.classList.remove('active');
            } else {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                item.classList.add('active');
            }
        });
    });
    
    // Animated statistics (if they exist)
    const stats = document.querySelectorAll('.stat-number');
    
    if (stats.length > 0) {
        const animateStats = () => {
            stats.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const startTime = performance.now();
                const startValue = 0;
                
                const updateStat = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    
                    if (elapsedTime < duration) {
                        const progress = elapsedTime / duration;
                        const currentValue = Math.floor(startValue + progress * (target - startValue));
                        stat.textContent = currentValue.toLocaleString();
                        requestAnimationFrame(updateStat);
                    } else {
                        stat.textContent = target.toLocaleString();
                    }
                };
                
                requestAnimationFrame(updateStat);
            });
        };
        
        // Use Intersection Observer to trigger animation when stats are visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }
});
