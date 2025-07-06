import { View, Text, Alert, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { API_URL } from '../../constants/api';
import { MealAPI } from '../../services/mealAPI';
import LoadingSpinner from '../../components/LoadingSpinner';
import { recipeDetailStyles } from '../../assets/styles/recipe-details.styles';
import {Image} from 'expo-image';

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

    const handleToggleSave = async () => {
        setIsSaving(true);
        try {
            if(isSaved) {
                //Remove from favorites
                const response = await fetch(`${API_URL}/favorites/${userId}/${recipeId}`,
                    {method: "DELETE", 
                    });

                    if(!response.ok) throw new Error("Failed to remove recipe");
                    setIsSaved(false);

            }else {
                // Add to favorites
                const response = await fetch(`${API_URL}/favorites`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        userId,
                        recipeId: parseInt(recipeId),
                        title: recipe.title,
                        image: recipe.image,
                        cookTime: recipe.cookTime,
                        servings: recipe.servings,
                    }),
                });

                if (!response.ok) throw new Error("Failed to Save Recipe");
                setIsSaved(true);
            }
        } catch (error) {
            console.error("Error Toggling Recipe Save:", error);
            Alert.alert("Error", `Something Went Wrong. Please try again.`);

        } finally {
            setIsSaving(false);
        }
    };

    if(loading) return <LoadingSpinner message='Loading Recipe Details...'/>
  return (
    <View style={recipeDetailStyles.container}>
        <ScrollView >
            {/* Header */}
            <View style={recipeDetailStyles.headerContainer}>
                <View style={recipeDetailStyles.imageContainer}>
                    <Image
                    source={{uri: recipe.image}}
                    style={recipeDetailStyles.headerImage}
                    contentFit='cover'/>

                </View>

            </View>

        </ScrollView>
      <Text>RecipeDetailsScreen</Text>
    </View>
  )
}

export default RecipeDetailsScreen