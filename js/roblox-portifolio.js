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
    
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioSections = document.querySelectorAll('.portfolio-section');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            
            portfolioSections.forEach(section => {
                section.classList.toggle('hidden', 
                    filterValue !== 'all' && !section.id.includes(filterValue)
                );
            });
        });
    });

    // Game data with place IDs
    const gameData = [
        {
            title: "Tiny 2d Bread Factory 2",
            description: "First Fully 2d Game made on Roblox with 20k visits!",
            placeId: "14582193124",
            link: "https://www.roblox.com/games/14582193124",
            category: "games"
        }
        // Add more games here
    ];

    // Initialize game cards
    function initializeGameCards() {
        const gamesGrid = document.querySelector('.games-grid');
        
        gameData.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.setAttribute('data-category', game.category);
            
            gameCard.innerHTML = `
                <div class="game-logo loading">
                    <img class="GameLogo" 
                         id="${game.placeId}" 
                         src="../images/transparent.png" 
                         alt="${game.title}" 
                         loading="lazy">
                </div>
                <div class="game-content">
                    <h3>${game.title}</h3>
                    <p>${game.description}</p>
                    <a href="${game.link}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-play"></i> Play Now
                    </a>
                </div>
            `;
            
            gamesGrid.appendChild(gameCard);
        });
    }

    // Fetch game images from Netlify function
    async function loadGameImages() {
        const gameLogos = document.querySelectorAll('.GameLogo');
        
        for (const logo of gameLogos) {
            const placeId = logo.id;
            const container = logo.parentElement;
            
            try {
                const response = await fetch(
                    `../.netlify/functions/fetchRobloxData?placeId=${placeId}`
                );
                const data = await response.json();

                if (response.ok) {
                    logo.style.opacity = '0';
                    logo.src = data.result;
                    logo.onload = () => {
                        logo.style.opacity = '1';
                        container.classList.remove('loading');
                    };
                }
            } catch (error) {
                console.error("Error loading game image:", error);
                logo.src = '../images/transparent.png';
                container.classList.remove('loading');
            }
        }
    }

    // Lazy load YouTube videos
    function lazyLoadVideos() {
        const videoIframes = document.querySelectorAll('iframe[data-src]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const iframe = entry.target;
                    iframe.src = iframe.dataset.src;
                    observer.unobserve(iframe);
                }
            });
        }, { rootMargin: '200px' });

        videoIframes.forEach(iframe => observer.observe(iframe));
    }

    const id1 = document.getElementById('discord-id');

    if (id1) {
        id1.addEventListener('click', function () {
            window.open("https://discord.com/users/785504762938392657", "_blank")
        });
    }

    // Initialize all components
    initializeGameCards();
    loadGameImages();
    lazyLoadVideos();
});