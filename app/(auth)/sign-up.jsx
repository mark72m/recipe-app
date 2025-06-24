import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {useRouter} from "expo-router";
import {useSignUp} from "@clerk/clerk-expo";
import {useState} from "react";
import {authStyles} from "../../assets/styles/auth.styles";
import {Image} from "expo-image";

const SignUpScreen = () => {

  const router = useRouter();
  const {isLoaded, signUp} = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }
    if (password.length < 6) return Alert.alert("Password must be 6 characters or more");

    if(!isLoaded) return;

    setLoading(true);

    try {
      await signUp.create ({emailAddress: email, password})
      await signUp.prepareEmailAddressVerification({strategy: "email_code"});
      setPendingVerification(true);

    }catch (err){
      Alert.alert("Error", err.errors?.[0]?.message || "Failed to create account. Please try again.");
      console.error(JSON.stringify(err, null, 2));

    } finally {
      setLoading(false);
    }

  };

  if (pendingVerification) return <Text>Pending UI will go here</Text>

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 64}
      style={authStyles.keyboardView}>

        <ScrollView 
        contentContainerStyle={authStyles.scrollContent}
        showsVerticalScrollIndicator={false}>

          {/* Image Container*/}
          <View style={authStyles.imageContainer}>
            <Image 
            source={require("../../assets/images/i2.png")}
            style={authStyles.image}
            contentFit="contain"/>
          </View>

          <Text style={authStyles.title}>✍️ Create Account</Text>

        </ScrollView>

      </KeyboardAvoidingView>
    </View>
  )
}

export default SignUpScreen;