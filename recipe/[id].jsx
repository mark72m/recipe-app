import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { API_URL } from '../constants/api';
import { MealAPI } from '../services/mealAPI';

const RecipeDetailsScreen = () => {
    const {id:recipeId} = useLocalSearchParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSaved, setIsSaved] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const {user} = useUser();
    const userId = user?.id;

    useEffect(() => {
        const checkIfSaved = async () => {
            try {
                const response = await fetch(`${API_URL}/favorites/${userId}`);
                const favorites = await response.json();
                const isRecipeSaved = favorites.some((fav) => fav.recipeId === parseInt (recipeId));
                setIsSaved(isRecipeSaved);
            } catch (error) {
                console.error("Error Checking if Recipe is Saved:", error);
            }
        };

        const loadRecipeDetail = async () => {
            setLoading(true);
            try {
                const mealData = await MealAPI.getMealById(recipeId);
                if(mealData) {
                    const transformedRecipe = MealAPI.transformMealData(mealData);

                    const recipeWithVideo = {
                        ...transformedRecipe,
                        youtubeUrl: mealData.strYoutube || null,
                    };

                    setRecipe(recipeWithVideo);
                }

            } catch (error){
                console.error("Error Loading Recipe Detail:", error);
            } finally {
                setLoading(false);
            }
        };

        checkIfSaved();
        loadRecipeDetail();
    }, [recipeId, userId]);

    // iUsing the web-View package
    const getYoutubeEmbedUrl = (url) => {
        const videoId = url.split("v=")[1]
        return `https://www.youtube.com/embed/${videoId}`
        
    }
  return (
    <View>
      <Text>RecipeDetailsScreen</Text>
    </View>
  )
}

export default RecipeDetailsScreen