import { View, Text, ScrollView } from 'react-native'
import { useEffect, useState } from 'react';
import { useRouter} from 'expo-router';
import { MealAPI} from "../../services/mealAPI";
import { homeStyles } from "../../assets/styles/home.styles";
import {Image} from "expo-image";
const HomeScreen = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [apiCategories, randomMeals, featuredMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal(),
      ]);

      const transformedCategories = apiCategories.map((cat, index) => ({
        id: index + 1,
        name: cat.strCategory,
        image: cat.strCategoryThumb,
        description: cat.strCategoryDescription,
      }));

      setCategories(transformedCategories);

      const transformedMeals = randomMeals
      .map((meal) => MealAPI.transformMealData(meal))
      .filter((meal) => meal !== null)

      setRecipes(transformedMeals);

      const transformedFeatured = MealAPI.transformMealData(featuredMeal);
      setFeaturedRecipe(transformedFeatured);
    } catch(error) {
      console.log("Error Loading the Data", error)
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      const transformedMeals = meals
      .map((meal) => MealAPI.transformMealData(meal))
      .filter((meal) => meal !== null)
      setRecipes(transformedMeals);
    } catch (error) {
      console.error("Error Loading Category Data:", error);
      setRecipes([]);
    }
  };

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await loadCategoryData(category);
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <View style={homeStyles.container}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={() => {}}
      contentContainerStyle={homeStyles.scrollContent}>

        <View style={homeStyles.welcomeSection}>
          <Image 
          source={require("../../assets/images/lamb.png")}
          style={{
            width: 100,
            height: 100,
          }}/>

        </View>

      </ScrollView>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen;