const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const MealAPI = {
    // Search Meal by name
    searchMealsByName: async (Query) => {
        try {
            const response = await fetch(`${BASE_URL}/search.php?s=${encodeURIComponent(Query)}`);

            const data = await response.json();
            return data.meals || [];
        } catch(error) {
            console.error("Error searching meals by name:", error);
            return [];
        }
    },

    getMealById: async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);
            const data = await response.json();
            return data.meals ? data.meals[0] : null;
        } catch(error) {
            console.error("Error getting Meal by id:", error);
            return null;
        }
    },

    
};
            