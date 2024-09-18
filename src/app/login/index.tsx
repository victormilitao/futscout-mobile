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
  password: zod
    .string()
    .min(6, 'O password deve conter no mínimo 6 caracteres'),
})
type LoginData = zod.infer<typeof loginValidation>

export default function Login() {
  const router = useRouter()
  const { login } = useSession()
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
    mode: 'onSubmit'
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
        <Controller
          control={control}
          name='email'
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                label='Email'
                placeholder='Email'
                value={value}
                onChangeText={onChange}
                keyboardType='email-address'
                autoCapitalize='none'
                error={errors.email?.message}
              />
            </>
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field: { onChange, value } }) => (
            <>
              <Input
                label='Senha'
                placeholder='Senha'
                value={value}
                onChangeText={onChange}
                secureTextEntry
                autoCapitalize='none'
                error={errors.password?.message}
              />
            </>
          )}
        />

        <Space />
        <Button onPress={handleSubmit(handleLogin, onError)}>Entrar</Button>
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
