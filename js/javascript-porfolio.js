document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Back to top button functionality
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Lazy load iframes
    const videos = document.querySelectorAll('.project-video iframe');
    
    if (videos.length > 0) {
        videos.forEach(iframe => {
            const src = iframe.getAttribute('data-src');
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        iframe.setAttribute('src', src);
                        observer.unobserve(iframe);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(iframe);
        });
    }
    
    // Discord ID copy functionality
    const discordElements = document.querySelectorAll('#discord-id');
    
    if (discordElements.length > 0) {
        discordElements.forEach(element => {
            element.addEventListener('click', function() {
                const discordId = 'imnotlycky';
                navigator.clipboard.writeText(discordId).then(() => {
                    // Create a tooltip to show it was copied
                    const tooltip = document.createElement('div');
                    tooltip.className = 'copy-tooltip';
                    tooltip.textContent = 'Discord ID copied!';
                    document.body.appendChild(tooltip);
                    
                    // Position the tooltip near the element
                    const rect = element.getBoundingClientRect();
                    tooltip.style.top = `${rect.top - 40}px`;
                    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
                    
                    // Remove the tooltip after 2 seconds
                    setTimeout(() => {
                        tooltip.remove();
                    }, 2000);
                });
            });
        });
    }
});

// Add CSS for the copy tooltip
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .copy-tooltip {
            position: fixed;
            background-color: var(--secondary-color);
            color: var(--light-text);
            padding: 8px 12px;
            border-radius: 4px;
            z-index: 1000;
            font-size: 0.9rem;
            animation: fadeInOut 2s ease;
            pointer-events: none;
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { opacity: 0; }
        }
    </style>
`);