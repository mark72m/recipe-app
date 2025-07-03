import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import {useClerk, useUser} from "@clerk/clerk-expo";
import { useEffect, useState} from 'react';
import { API_URL } from '../../constants/api';
import { favoritesStyles } from '../../assets/styles/favorites.styles';
import {Ionicons} from "@expo/vector-icons";
import { COLORS } from '../../constants/colors';
import RecipeCard from '../../components/RecipeCard';

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
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
        <Text style={favoritesStyles.title}>Favorites</Text>
        <TouchableOpacity style={favoritesStyles.logoutButton}
        onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={22} color={COLORS.text}/>
        </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
        <FlatList data={favoriteRecipes}
        renderItem={({item}) => <RecipeCard recipe={item}/>}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={favoritesStyles.row}
        contentContainerStyle={favoritesStyles.recipesGrid}
        scrollEnabled={false}
        ListEmptyComponent={<NoFavoritesFound/>} />

        </View>
      </ScrollView>
    </View>
  )
}

export default FavoritesScreen;