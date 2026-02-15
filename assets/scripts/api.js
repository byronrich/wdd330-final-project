const API_KEY = "apikey"; 
const BASE_URL = "https://api.spoonacular.com/recipes/complexSearch";

export async function fetchRecipes(query) {
    const url = `${BASE_URL}?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&number=12`;

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
// complex search api
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
//search filter options for searching in in teh program
export async function fetchRecipes(query, filters = {}) {
    let url = `${BASE_URL}?apiKey=${API_KEY}&query=${encodeURIComponent(query)}&number=12`;

    if (filters.vegetarian) url += "&diet=vegetarian";
    if (filters.vegan) url += "&diet=vegan";
    if (filters.glutenFree) url += "&intolerances=gluten";
}
