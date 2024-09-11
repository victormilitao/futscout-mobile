import ParallaxScrollView from '@/src/components/ParallaxScrollView'
import { ThemedText } from '@/src/components/ThemedText'
import Space from '@/src/components/space'
import { useThemeColor } from '@/src/hooks/useThemeColor'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  Text,
  Alert, Pressable
} from 'react-native'

export default function Login() {
  const color = useThemeColor({}, 'brandingPrimary')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Erro', 'Preencha todos os campos')
      return
    }
    router.replace('/(tabs)')
  }

  return (
    <>
      <StatusBar style="light" />
      <ParallaxScrollView
        headerImage={
          <Image
            source={require('@/src/assets/images/bg-login.png')}
            style={styles.bgLogin}
          />
        }
        centeredImage={require(`@/src/assets/images/logo.png`)}
      >
        <ThemedText type="subtitle">
          Acesse o Fut Scout. É simples e rápido.
        </ThemedText>
        <Space size="md" />
        <Text>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          autoCapitalize="none"
        />
        <Space />
        <Pressable
          style={[styles.button, { backgroundColor: color }]}
          onPress={handleLogin}
        >
          <Text style={[styles.text, { color: 'white' }]}>Entrar</Text>
        </Pressable>
        
      </ParallaxScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  bgLogin: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  logoContainer: {
    position: 'absolute',
    top: -100,
    left: '50%',
    transform: [{ translateX: -75 }, { translateY: -75 }],
  },
  logo: {
    width: 150,
    height: 150,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
})
