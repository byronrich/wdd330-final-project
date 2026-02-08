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
