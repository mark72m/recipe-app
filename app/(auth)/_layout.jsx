import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';

export default function AuthRoutesLayout() {
  //useAuth Hook from @clerk/clerk-expo to check if user is signed in
  const { isSignedIn } = useAuth();

  if (isSignedIn) return <Redirect href={"/"} />

  return <Stack  screenOptions={{ headerShown: false }}/>
}