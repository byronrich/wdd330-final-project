// Import the API function that fetches recipe details
import { fetchRecipeDetails } from "./api.js";

// Main container where recipe details will be rendered
const container = document.getElementById("recipeContainer");

// Loading spinner element
const loading = document.getElementById("detailsLoading");

// Get recipe ID from the URL (?id=12345)
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

// If an ID exists, load the recipe details
if (recipeId) {
    loadRecipe(recipeId);
}

// Fetch recipe details and handle loading/error states
async function loadRecipe(id) {
    loading.classList.remove("hidden"); // Show spinner

    const data = await fetchRecipeDetails(id);

    loading.classList.add("hidden"); // Hide spinner

    if (!data) {
        container.innerHTML = `<p class="error">Unable to load recipe details.</p>`;
        return;
    }

    // Render the recipe and initialize the favorites button
    renderRecipe(data);
    setupFavoriteButton(data);
}

// Build the HTML for the recipe details page
function renderRecipe(recipe) {
    container.innerHTML = `
        <div class="recipe-header">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
            <h2>${recipe.title}</h2>

            <!-- Back button returns to search page -->
            <a href="index.html" class="back-btn">← Back to Search</a>

            <!-- Favorites toggle button -->
            <button id="favBtn" class="fav-btn">Add to Favorites</button>
        </div>

        <section class="nutrition">
            <h3>Nutrition</h3>
            <p><strong>Servings:</strong> ${recipe.servings}</p>
            <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
        </section>

        <section class="ingredients">
            <h3>Ingredients</h3>
            <ul>
                ${recipe.extendedIngredients
                    .map(ing => `<li>${ing.original}</li>`)
                    .join("")}
            </ul>
        </section>

        <section class="instructions">
            <h3>Instructions</h3>
            <p>${recipe.instructions || "No instructions available."}</p>
        </section>
    `;
}

// Handles adding/removing recipes from LocalStorage favorites
function setupFavoriteButton(recipe) {
    const favBtn = document.getElementById("favBtn");

    // Load existing favorites or create empty array
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Check if this recipe is already saved
    const isFavorite = favorites.some(f => f.id === recipe.id);

    // Set initial button text
    favBtn.textContent = isFavorite ? "Remove from Favorites" : "Add to Favorites";

    // Handle button click
    favBtn.addEventListener("click", () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.some(f => f.id === recipe.id)) {
            // Remove from favorites
            favorites = favorites.filter(f => f.id !== recipe.id);
            favBtn.textContent = "Add to Favorites";
        } else {
            // Add to favorites
            favorites.push({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image
            });
            favBtn.textContent = "Remove from Favorites";
        }

        // Save updated favorites list
        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
}
