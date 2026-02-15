//initial code for details.js
import { fetchRecipeDetails } from "./api.js";

const container = document.getElementById("recipeContainer");

// Get recipe ID from URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

if (recipeId) {
    loadRecipe(recipeId);
}

async function loadRecipe(id) {
    const data = await fetchRecipeDetails(id);

    if (!data) {
        container.innerHTML = `<p class="error">Unable to load recipe details.</p>`;
        return;
    }

    renderRecipe(data);
}
//this section includes:
function renderRecipe(recipe) {
    container.innerHTML = `
        <div class="recipe-header">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
            <h2>${recipe.title}</h2>
            <a href="index.html" class="back-btn">← Back to Search</a> 
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

function setupFavoriteButton(recipe) {
    const favBtn = document.getElementById("favBtn");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isFavorite = favorites.some(f => f.id === recipe.id);
    favBtn.textContent = isFavorite ? "Remove from Favorites" : "Add to Favorites";

    favBtn.addEventListener("click", () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (favorites.some(f => f.id === recipe.id)) {
            favorites = favorites.filter(f => f.id !== recipe.id);
            favBtn.textContent = "Add to Favorites";
        } else {
            favorites.push({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image
            });
            favBtn.textContent = "Remove from Favorites";
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    });
}

}
//favorites system
function setupFavoriteButton(recipe) {
    const favBtn = document.getElementById("favBtn");

    favBtn.addEventListener("click", () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        // Prevent duplicates
        if (!favorites.some(f => f.id === recipe.id)) {
            favorites.push({
                id: recipe.id,
                title: recipe.title,
                image: recipe.image
            });

            localStorage.setItem("favorites", JSON.stringify(favorites));
            favBtn.textContent = "Added!";
        }
    });
}
//loading indicator to support similar section in index.html
const loading = document.getElementById("detailsLoading");

async function loadRecipe(id) {
    loading.classList.remove("hidden");

    const data = await fetchRecipeDetails(id);

    loading.classList.add("hidden");
    if (!data) {
    container.innerHTML = `<p class="error">Unable to load recipe details.</p>`;
    return;
    }    
}
