import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../constants/colors";
import { favoritesStyles } from "../assets/styles/favorites.styles";
import { Ionicons } from "@expo/vector-icons";

function NoFavoritesFound() {
    const router = useRouter();

    return (
        <View style={favoritesStyles.emptyState}>
            <View style={favoritesStyles.emptyIconContainer}>
                <Ionicons name="heart-outline" size={80} color={COLORS.textLight}/>
            </View>
            <Text style={favoritesStyles.emptyTitle}>No Favorites Yet</Text>
            <TouchableOpacity style={favoritesStyles.exploreButton} onPress={() => router.push("/")}>
                <Ionicons name="search" size={18} color={COLORS.white}/>
                <Text style={favoritesStyles.exploreButtonText}>Explore Recipes</Text>
            </TouchableOpacity>
        </View>
    );
}

export default NoFavoritesFound;