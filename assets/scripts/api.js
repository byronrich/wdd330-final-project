const API_KEY = "ddcc86e69f93415d8beea53d5e963785";
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

// Unified fetchRecipes function
export async function fetchRecipes(query, filters = {}) {
    let url = `${BASE_URL}?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&number=12`;

    if (filters.vegetarian) url += "&diet=vegetarian";
    if (filters.vegan) url += "&diet=vegan";
    if (filters.glutenFree) url += "&intolerances=gluten";

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching recipes:", error);
        return null;
    }
}

// Recipe details
export async function fetchRecipeDetails(id) {
    const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch recipe details");

        return await response.json();
    } catch (error) {
        console.error("Error fetching recipe details:", error);
        return null;
    }
}
