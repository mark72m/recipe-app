import {useSignIn} from "@clerk/clerk-expo";
import {useRouter} from "expo-router";
import { useState } from "react";
import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';

import {authStyles} from "../../assets/styles/auth.styles";
import {Image} from "expo-image";
import { COLORS } from "../../constants/colors";

const SignInScreen = () => {
  const router = useRouter();
  const {signIn, setActive, isLoaded} = useSignIn();
  const [email, setEmail ]= useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Please enter email and password");
      return;
    }

    if(!isLoaded) return;

    setLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password
      })

      if (signInAttempt.status === "complete") {
        await setActive({session: signInAttempt.createdSessionId})
      }else {
        Alert.alert("Error", "Sign In Failed. Please Try Again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    }catch (err){
      Alert.alert("Error", err.errors?.[0]?.message || "Sign In Failed");
      console.error(JSON.stringify(err, null, 2));

    }finally {
      setLoading(false);

    }
  }

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        style={authStyles.keyboardView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView 
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
          >
            <View style={authStyles.imageContainer}>
              <Image
              source={require("../../assets/images/i1.png")}
              style={authStyles.image}
              contentFit="contain"/>
            </View>

            <Text style={authStyles.title}>Welcome Back</Text>

            {/* FORM CONTAINER*/}
            <View style={authStyles.formContainer}>
              {/*EMAIL INPUT*/}
              <View style={authStyles.inputContainer}>
                <TextInput
                style={authStyles.textInput}
                placeholder="Enter Email Now"
                placeholderTextColor={COLORS.textLight}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"/>
                  
              </View>

            </View>

          </ScrollView>

      </KeyboardAvoidingView>
    </View>
  )
}

export default SignInScreen;