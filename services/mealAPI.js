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

    // lookup full meal details by id
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

    // lookup a single random meal
    getRandomMeal: async () => {
        try {
            const response = await fetch(`${BASE_URL}/random.php`);
            const data = await response.json();
            return data.meals ? data.meals[0] : null;

        } catch (error) {
            console.error("Error getting random meal:", error);
            return null;
        }
    },

    // Get multiple random meals
    getRandomMeals: async (count = 6) => {
        try {
            const promises = Array(count)
            .full()
            .map[() => MealAPI.getRandomMeal()];
            const meals = await Promise.all(promises);
            return meals.filter((meal) => meal !== null);
        } catch (error) {
            console.error("Error getting random meals:", error);
            return [];
        }
    },

    // list all meal categories
    getCategories: async () => {
        try {
            const response = await fetch(`${BASE_URL}/categories.php`);
            const data = await response.json();
            return data.categories || [];

        } catch (error) {
            console.error("Erroe getting categories:", error);
        }
    },
    
    // filter by main ingridient
    filterByIngridient: async (ingridient) => {
        try{
            const response = await fetch(`${BASE_URL}/filter.php?i=${encodeURIComponent(ingridient)}`);
            const data = await response.json();
            return data.meals || [];
        } catch (error) {
            console.error("Error filtering by ingridient:", error);
            return [];
        }
    }
    
};
            