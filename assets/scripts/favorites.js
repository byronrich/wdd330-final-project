//base favorites.js code
const container = document.getElementById("favoritesContainer");

function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        container.innerHTML = `<p class="empty-state">No favorites yet.</p>`;
        return;
    }

    favorites.forEach(recipe => {
        const card = document.createElement("div");
        card.classList.add("recipe-card");

        card.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.title}">
            <h3>${recipe.title}</h3>
            <a href="recipe.html?id=${recipe.id}" class="details-btn">View Details</a>
        `;

        container.appendChild(card);
    });
}

loadFavorites();
