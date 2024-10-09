import Button from '@/src/components/Button'
import ParallaxScrollView from '@/src/components/ParallaxScrollView'
import { ThemedText } from '@/src/components/ThemedText'
import Input from '@/src/components/form/Input'
import Space from '@/src/components/space'
import { useSession } from '@/src/contexts/session'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Controller, SubmitErrorHandler, useForm } from 'react-hook-form'
import { Image, StyleSheet, Alert } from 'react-native'
import zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const loginValidation = zod.object({
  email: zod.string().email('Informe um email válido'),
  password: zod.string().min(6, 'A senha deve conter no mínimo 6 caracteres'),
})
type LoginData = zod.infer<typeof loginValidation>

export default function Login() {
  const router = useRouter()
  const { login, isLoading } = useSession()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  })

  const handleLogin = async (data: LoginData) => {
    console.log(data)
    try {
      await login(data)
      router.navigate('/(tabs)')
    } catch (error) {
      console.error(error)
      Alert.alert('Login error')
    }
  }

  const onError: SubmitErrorHandler<LoginData> = (errors, e) => {
    console.log(JSON.stringify(errors))
  }

  return (
    <>
      <StatusBar style='light' />
      <ParallaxScrollView
        headerImage={
          <Image
            source={require('@/src/assets/images/bg-login.png')}
            style={styles.bgLogin}
          />
        }
        centeredImage={require(`@/src/assets/images/logo.png`)}
      >
        <ThemedText type='subtitle'>
          Acesse o Fut Scout. É simples e rápido.
        </ThemedText>
        <Space size='md' />

        <Input
          name='email'
          control={control}
          label='Email'
          placeholder='Email'
          keyboardType='email-address'
          autoCapitalize='none'
          error={errors.email?.message}
        />

        <Space />
        <Input
          name='password'
          control={control}
          label='Senha'
          placeholder='Senha'
          secureTextEntry
          autoCapitalize='none'
          error={errors.password?.message}
        />

        <Space size='lg' />
        <Button
          onPress={handleSubmit(handleLogin, onError)}
          isLoading={isLoading}
        >
          Entrar
        </Button>
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
})
