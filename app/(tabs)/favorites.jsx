import { View, Text, Alert } from 'react-native'
import {useClerk, useUser} from "@clerk/clerk-expo";
import { useEffect, useState} from 'react';
import { API_URL } from '../../constants/api';
import { favoritesStyles } from '../../assets/styles/favorites.styles';

const FavoritesScreen = () => {
  const {signOut} = useClerk();
  const { user } = useUser();
  const [ favoriteRecipes, setFavoriteRecipes ] = useState([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    const loadFavorites = async() => {
      try {
        const response = await fetch(`${API_URL}/favorites/${user.id}`)
        if (!response.ok) throw new Error("Failed to Fetch Favorites");

        const favorites = await response.json();
        const transformedFavorites = favorites.map(favorite => ({
          ...favorite,
          id: favorite.recipeId
        }))

        setFavoriteRecipes(transformedFavorites);

      } catch (error) {
        console.log("Error loading favorites", error);
        Alert.alert("Error", "Failed to Load Favorites");
      } finally {
        setLoading(false);
      }
    };
    loadFavorites();
  }, [user.id]);

  const handleSignOut = async => {};

  if (loading) return <Text>Loading Favorites...</Text>


  return (
    <View>
      <Text>FavoritesScreen</Text>
    </View>
  )
}

export default FavoritesScreen;