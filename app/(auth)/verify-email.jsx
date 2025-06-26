import { View, Text } from 'react-native'
import React from 'react'

const VerifyEmail = (email, onBack) => {
  const {isLoaded, signUp, setActive } = useSignUp();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  
  return (
    <View>
      <Text>VerifyEmail</Text>
    </View>
  )
}
export default VerifyEmail;