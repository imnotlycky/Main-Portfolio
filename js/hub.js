let Amount = localStorage.getItem("Amount") || 0

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle the hamburger menu animation
            const bars = mobileMenu.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('change'));
        });
    }
    
    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                
                // Reset hamburger menu
                const bars = mobileMenu.querySelectorAll('.bar');
                bars.forEach(bar => bar.classList.remove('change'));
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Get the height of the navbar
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    
                    // Calculate the position to scroll to
                    const targetPosition = targetElement.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        // Show or hide the button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        // Scroll to top when button is clicked
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Active navigation link highlighting based on scroll position
    function highlightNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Get current scroll position
        const scrollY = window.pageYOffset;
        
        // Loop through sections to find the current one
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Adjust for navbar
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => {
                    link.classList.remove('active-link');
                });
                
                // Add active class to current link
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active-link');
            }
        });
    }
    
    // Call the highlight function on scroll
    window.addEventListener('scroll', highlightNavLink);
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const discordname = document.getElementById('discord').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !message) {
                showFormAlert('Please fill in all required fields', 'error');
                return;
            }
            
            // Email validation
            /*if (!isValidEmail(email)) {
                showFormAlert('Please enter a valid email address', 'error');
                return;
            }*/

            const formData = {
                "content": null,
                "embeds": [
                  {
                    "title": "Job Application",
                    "description": `**Subject:**\n${subject}\n\n**Client Name:**\n${name}\n\n**Discord Username:**\n${discrodname}\n\n**Message:**\n${message}`,
                    "color": 3342591,
                    "fields": [
                      {
                        "name": "Job Id",
                        "value": `${Amount}}`
                      }
                    ]
                  }
                ],
                "attachments": []
              }
            
              try {
                // Send data to Netlify function
                const response = await fetch('../.netlify/functions/discordWebhook', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
    
                const result = await response.json();
    
                if (response.ok) {
                    showFormAlert('Message sent successfully! I will get back to you soon.', 'success');
                    contactForm.reset();
                } else {
                    throw new Error(result.error || 'Something went wrong.');
                }
            } catch (error) {
                showFormAlert(`Error: ${error.message}`, 'error');
            }
        });
    }
    
    // Helper function to show form alerts
    function showFormAlert(message, type) {
        // Check if alert element already exists
        let alertElement = document.querySelector('.form-alert');
        
        // If not, create it
        if (!alertElement) {
            alertElement = document.createElement('div');
            alertElement.className = 'form-alert';
            contactForm.insertAdjacentElement('beforebegin', alertElement);
        }
        
        // Set message and style based on type
        alertElement.textContent = message;
        alertElement.className = `form-alert ${type}`;
        
        // Add styles directly since they might not be in the CSS
        alertElement.style.padding = '10px';
        alertElement.style.marginBottom = '20px';
        alertElement.style.borderRadius = '4px';
        alertElement.style.fontWeight = '500';
        
        if (type === 'success') {
            alertElement.style.backgroundColor = 'rgba(46, 204, 113, 0.2)';
            alertElement.style.color = '#2ecc71';
            alertElement.style.border = '1px solid #2ecc71';

            localStorage.setItem("Amount", localStorage.getItem("Amount")+1)
        } else {
            alertElement.style.backgroundColor = 'rgba(231, 76, 60, 0.2)';
            alertElement.style.color = '#e74c3c';
            alertElement.style.border = '1px solid #e74c3c';
        }
        
        // Remove after 5 seconds
        setTimeout(() => {
            alertElement.remove();
        }, 5000);
    }
    
    // Add event listeners for any theme switcher buttons
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            if (theme) {
                setTheme(theme);
                
                // Update active class on theme options
                document.querySelectorAll('.theme-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Add hover effects for category cards
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.category-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.category-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Add CSS for hamburger menu animation
    const style = document.createElement('style');
    style.textContent = `
        .menu-toggle.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        .menu-toggle.active .bar:nth-child(2) {
            opacity: 0;
        }
        .menu-toggle.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        .nav-link.active-link {
            color: var(--primary-color);
        }
    `;
    document.head.appendChild(style);

    const id1 = document.getElementById('discord-id');
    const id2 = document.getElementById('discord-id2');

    if (id1 && id2) {
        id1.addEventListener('click', function () {
            window.open("https://discord.com/users/785504762938392657", "_blank")
        });

        id2.addEventListener('click', function () {
            window.open("https://discord.com/users/785504762938392657", "_blank")
        })
    }
});