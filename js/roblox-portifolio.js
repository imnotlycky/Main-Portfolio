function numRound(inp) {
    function round(inp) {
        return Math.round(inp);
    }

    function toNum(inp) {
        return isNaN(Number(inp)) ? null : Number(inp);
    }

    if (inp !== null && inp !== undefined) {
        let val = toNum(inp);
        if (val !== null) {
            return round(val);
        }
    }
    return null;
}

function roundDown(value, decimalPlaces) {
    let multiplier = Math.pow(10, decimalPlaces);
    return Math.floor(value * multiplier) / multiplier;
}

function formatStr(number) {
    number = number || 0;
    let num = numRound(number);

    if (number < 1000) {
        num = roundDown(number, 1);
    }

    let str = num.toString();
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const suffixes = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

function formatNum(input, limit = 1e21) {
    let num = Number(input);
    if (isNaN(num)) return null;
    
    num = Math.abs(num);
    const StrLimit = 1e21;
    const NumLimit = 1e308;

    if (num >= limit || num >= StrLimit) {
        for (let i = 1; i < suffixes.length; i++) {
            if (num < Math.pow(10, i * 3)) {
                return (Math.floor(num / (Math.pow(10, (i - 1) * 3) / 100)) / 100) + suffixes[i];
            } else if (num >= NumLimit) {
                return "Inf";
            }
        }
    }

    return formatStr(num);
}

let proxy = "roproxy"
let api = "https://lycky-2n0fwe7sr-lyckys-projects.vercel.app/api/roblox?address="

async function fetchRobloxGameIcon(placeId) {
    const apiUrl = encodeURIComponent(`thumbnails.${proxy}.com/v1/assets?assetIds=${placeId}&returnPolicy=PlaceHolder&size=700x700&format=Png&isCircular=false`)
    const newApiUrl = `${api}${apiUrl}`
    try {
        const response = await fetch(`${newApiUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });

        const result = await response.json();

        if (response.ok && result.data && result.data.length > 0) {
            return result.data[0].imageUrl;
        } else {
            return "../images/transparent.png";
        }
    } catch (e) {
        console.error("Error fetching icon:", e);
        return "../images/transparent.png";
    }
}


async function fetchRobloxGameInfo(placeId) {
    const universeUrl = encodeURIComponent(`apis.${proxy}.com/universes/v1/places/${placeId}/universe`);
    const newApiUrl = `${api}${universeUrl}`
    try {
        const response = await fetch(`${newApiUrl}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        const result = await response.json();

        const gameUrl = encodeURIComponent(`games.${proxy}.com/v1/games?universeIds=${result.universeId}`)
        const newgameUrl = `${api}${gameUrl}`
        const response2 = await fetch(`${newgameUrl}`, {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        });
        const result2 = await response2.json();

        return result2.data?.[0]?.visits ?? "Loading...";
    } catch (e) {
        console.error(e);
        return "Loading...";
    }
}

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
            description: "First Fully 2d Game made on Roblox",
            placeId: "14582193124",
            link: "https://www.roblox.com/games/14582193124",
            category: "games"
        },
        {
            title: "Level Incremental",
            description: "My First solo Code project (every place before this has been privated)",
            placeId: "16908148221",
            link: "https://www.roblox.com/games/16908148221",
            category: "games"
        },
        {
            title: "Ore Tycoon [Factorio]",
            description: "A remake of Factorio in roblox",
            placeId: "18343978555",
            link: "https://www.roblox.com/games/18343978555",
            category: "games"
        },
        {
            title: "Project Meltdown",
            description: "Roblox game based off of COD: Zombies (First Fps System)",
            placeId: "13663218830",
            link: "https://www.roblox.com/games/13663218830",
            category: "games"
        }
    ];

    // Initialize game cards
    async function initializeGameCards() {
        const gamesGrid = document.querySelector('.games-grid');

        for (val in gameData) {
            const game = gameData[val]

            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';
            gameCard.setAttribute('data-category', game.category);

            let visits = "Loading..."

            let visitamount = await fetchRobloxGameInfo(game.placeId)

            visits = formatNum(visitamount, 1e5)
            
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
                    <p>Visits: ${visits}</p>
                    <a href="${game.link}" target="_blank" class="btn btn-primary">
                        <i class="fas fa-play"></i> Play Now
                    </a>
                </div>
            `;
            
            gamesGrid.appendChild(gameCard);
        }

        return "success"
    }

    // Fetch game images from Netlify function
    async function loadGameImages() {
        const gameLogos = document.querySelectorAll('.GameLogo');
        
        for (const logo of gameLogos) {
            const placeId = logo.id;
            const container = logo.parentElement;
            
            logo.style.opacity = '0'
            logo.src = await fetchRobloxGameIcon(placeId)
            logo.onload = () => {
                logo.style.opacity = '1'
                container.classList.remove('loading')
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

    async function initializeAll() {
        await initializeGameCards();
        await loadGameImages();
        lazyLoadVideos();
    }

    initializeAll();
});
