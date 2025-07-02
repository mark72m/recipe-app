import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import {MealAPI} from '../../services/mealAPI';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const performSearch = async(query) => {
    if(!query.trim()) {
      const randomMeals = await MealAPI.getRandomMeals(12);
    }
  }

  useEffect(() => {}, [])


  return (
    <View>
      <Text>SearchScreen</Text>
    </View>
  )
}

export default SearchScreen;