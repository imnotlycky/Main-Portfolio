document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });
    
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Portfolio filtering - improved
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.project-card, .game-card');
    const sectionTitles = document.querySelectorAll('.portfolio-category-title');
    const portfolioSections = document.querySelectorAll('.portfolio-section');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Handle section visibility
            if (filterValue === 'all') {
                // Show all sections
                portfolioSections.forEach(section => {
                    section.classList.remove('hidden');
                });
            } else {
                // Show only related sections
                portfolioSections.forEach(section => {
                    if (section.id.includes(filterValue)) {
                        section.classList.remove('hidden');
                    } else {
                        section.classList.add('hidden');
                    }
                });
            }
            
            // Handle items visibility
            portfolioItems.forEach(item => {
                // Remove animation class
                item.classList.remove('fadeIn');
                
                // Show or hide items based on filter
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hidden');
                    // Trigger reflow for animation
                    void item.offsetWidth;
                    item.classList.add('fadeIn');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Initialize contact form (placeholder for future implementation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Form submission logic would go here
            alert('Form submission is currently disabled. Please contact via Discord.');
        });
    }
    
    // Add active class to nav links based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active-link');
        }
    });

    document.querySelectorAll('.GameLogo').forEach(async (e) => {
        let placeId = e.id;
    
        console.log(placeId);
    
        if (placeId) {
            try {
                let response = await fetch(`https://imnotlycky-portifolio.netlify.app/.netlify/functions/fetchRobloxData?placeId=${placeId}&secretKey=neor[v'0x4*wtP/vB6PF{Ada`);
                let data = await response.json(); // Assuming the API returns JSON
    
                if (data.imageUrl) { // Check if the response has the image URL
                    e.src = data.imageUrl;
                }
            } catch (error) {
                console.error("Error fetching image data:", error);
            }
        }
    });    
});