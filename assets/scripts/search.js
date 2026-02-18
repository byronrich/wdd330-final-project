console.log("search.js loaded");
import { fetchRecipes } from "./api.js";//start of initial logic for search.js

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");
const loadingIndicator = document.getElementById("loading");

function saveRecentSearch(query) { // start of recent search code
    let searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    // Remove duplicates
    searches = searches.filter(item => item !== query);

    // Add new search to front
    searches.unshift(query);

    // Limit to 5
    if (searches.length > 5) searches.pop();

    localStorage.setItem("recentSearches", JSON.stringify(searches));
}

function displayRecentSearches() {
    const container = document.getElementById("recentSearches");
    if (!container) return;

    const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];

    container.innerHTML = searches
        .map(s => `<button class="recent-btn">${s}</button>`)
        .join("");

    // Add click events
    document.querySelectorAll(".recent-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            searchInput.value = btn.textContent;
            searchRecipes(btn.textContent);
        });
    });
} // end of recent search js

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query.length === 0) return;

    searchRecipes(query);
});

async function searchRecipes(query) {
    resultsContainer.innerHTML = "";
    loadingIndicator.classList.remove("hidden");

    const recipes = await fetchRecipes(query, filters);
    const filters = {
        vegetarian: document.getElementById("vegFilter").checked,
        vegan: document.getElementById("veganFilter").checked,
        glutenFree: document.getElementById("glutenFilter").checked
    };


    loadingIndicator.classList.add("hidden");
    // if an error occurs
    if (recipes === null) {
        resultsContainer.innerHTML = `
            <p class="error">Something went wrong. Please try again.</p>
        `;
        return;
    }   
    //in the case no recipes are found
    if (!recipes || recipes.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <p>No recipes found. Try searching for “chicken”, “pasta”, or “dessert”.</p>
            </div>
    `;

        return;
    }

    recipes.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <img src="${recipe.image || 'assets/img/placeholders/no-image.png'}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <a href="recipe.html?id=${recipe.id}" class="details-btn">View Details</a>
        `;

        resultsContainer.appendChild(card);

    });

    //search query marker up to 5
    saveRecentSearch(query);
    displayRecentSearches();
    
}//end of initial logic for search.js

//keyboard support for search engine
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query.length === 0) return;
        searchRecipes(query);
    }
});

//clear search js in search.js lol
const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
});

displayRecentSearches(); //displays recent searches up to 5 past searches
