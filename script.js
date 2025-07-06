// Mock news data for demonstration (since NewsAPI has CORS restrictions)
const mockNewsData = {
    "india": [
        {
            "title": "India's Economy Shows Strong Growth Despite Global Challenges",
            "description": "India's GDP continues to outpace many developed nations, with strong performance in technology and manufacturing sectors driving economic expansion.",
            "urlToImage": "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-15T10:30:00Z",
            "source": {"name": "Economic Times"},
            "url": "https://example.com/news1"
        },
        {
            "title": "New Metro Line Opens in Mumbai, Reducing Traffic Congestion",
            "description": "The newly inaugurated metro line connects key business districts, promising to reduce travel time by 40% for daily commuters.",
            "urlToImage": "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-14T14:20:00Z",
            "source": {"name": "Times of India"},
            "url": "https://example.com/news2"
        },
        {
            "title": "Indian Space Mission Successfully Launches Communication Satellite",
            "description": "ISRO's latest mission marks another milestone in India's space exploration program, enhancing communication capabilities across rural areas.",
            "urlToImage": "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-13T09:15:00Z",
            "source": {"name": "NDTV"},
            "url": "https://example.com/news3"
        }
    ],
    "finance": [
        {
            "title": "Stock Market Reaches New All-Time High on Banking Sector Gains",
            "description": "Major banking stocks led the rally as investors showed confidence in the sector's performance and government policy support.",
            "urlToImage": "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-15T11:45:00Z",
            "source": {"name": "Bloomberg"},
            "url": "https://example.com/finance1"
        },
        {
            "title": "RBI Maintains Interest Rates, Focuses on Inflation Control",
            "description": "The central bank decided to keep key policy rates unchanged while monitoring inflation trends and economic growth indicators.",
            "urlToImage": "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-14T16:30:00Z",
            "source": {"name": "Financial Express"},
            "url": "https://example.com/finance2"
        },
        {
            "title": "Cryptocurrency Regulations Get Clearer Framework",
            "description": "New guidelines provide clarity for cryptocurrency trading and taxation, bringing more transparency to the digital asset market.",
            "urlToImage": "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-13T13:20:00Z",
            "source": {"name": "Mint"},
            "url": "https://example.com/finance3"
        }
    ],
    "politics": [
        {
            "title": "Parliament Session Begins with Focus on Economic Reforms",
            "description": "The winter session of Parliament is set to discuss key economic reforms and infrastructure development initiatives.",
            "urlToImage": "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-15T08:00:00Z",
            "source": {"name": "Indian Express"},
            "url": "https://example.com/politics1"
        },
        {
            "title": "State Elections: High Voter Turnout Recorded in Key Constituencies",
            "description": "Record voter participation observed in several states as citizens exercise their democratic rights in local elections.",
            "urlToImage": "https://images.unsplash.com/photo-1586440122194-2f2b13b6d5b8?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-14T12:00:00Z",
            "source": {"name": "The Hindu"},
            "url": "https://example.com/politics2"
        },
        {
            "title": "Digital India Initiative Expands to Rural Areas",
            "description": "Government's digital transformation program reaches remote villages, bringing internet connectivity and e-governance services.",
            "urlToImage": "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-13T10:30:00Z",
            "source": {"name": "DNA"},
            "url": "https://example.com/politics3"
        }
    ],
    "ipl": [
        {
            "title": "IPL 2025 Auction: Record-Breaking Bids for Star Players",
            "description": "The IPL auction witnessed unprecedented bidding wars as teams competed to secure top international and domestic talent.",
            "urlToImage": "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-15T15:45:00Z",
            "source": {"name": "ESPN Cricinfo"},
            "url": "https://example.com/ipl1"
        },
        {
            "title": "New Stadium to Host IPL Matches in Lucknow",
            "description": "The newly constructed stadium meets international standards and will serve as the home ground for Lucknow Super Giants.",
            "urlToImage": "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-14T17:15:00Z",
            "source": {"name": "Cricbuzz"},
            "url": "https://example.com/ipl2"
        },
        {
            "title": "Former Captain Announces Return to IPL After Injury",
            "description": "Star player confirms comeback after successful recovery from injury, boosting team morale ahead of the upcoming season.",
            "urlToImage": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop",
            "publishedAt": "2025-01-13T14:00:00Z",
            "source": {"name": "Sports Today"},
            "url": "https://example.com/ipl3"
        }
    ]
};

window.addEventListener("load", () => fetchNews("india"));

// Add the missing reload function
function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        const cardsContainer = document.getElementById("cards-container");
        cardsContainer.innerHTML = '<div class="loading">Loading news...</div>';
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get mock data based on query
        let articles = mockNewsData[query.toLowerCase()];
        
        // If no specific category, search in all categories
        if (!articles) {
            articles = [];
            Object.values(mockNewsData).forEach(categoryArticles => {
                articles.push(...categoryArticles.filter(article => 
                    article.title.toLowerCase().includes(query.toLowerCase()) ||
                    article.description.toLowerCase().includes(query.toLowerCase())
                ));
            });
        }
        
        if (articles && articles.length > 0) {
            bindData(articles);
        } else {
            showError('No news articles found for your search.');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        showError('Failed to load news. Please try again.');
    }
}

function showError(message) {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = `<div class="error">${message}</div>`;
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    if (!articles || articles.length === 0) {
        cardsContainer.innerHTML = '<div class="error">No news articles found.</div>';
        return;
    }

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});

// Add enter key support for search
searchText.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    }
});