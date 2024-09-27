import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store';

export interface Storage {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
  clear?: () => Promise<void>
}

export const asyncStorageService: Storage = {
  getItem: async (key: string): Promise<string | null> => {
    return await AsyncStorage.getItem(key)
  },

  setItem: async (key: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(key, value)
  },

  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key)
  },

  clear: async (): Promise<void> => {
    await AsyncStorage.clear()
  },
}

const secureStorageService: Storage = {
  getItem: async (key: string): Promise<string | null> => {
    return await SecureStore.getItem(key)
  },

  setItem: async (key: string, value: string): Promise<void> => {
    await SecureStore.setItem(key, value)
  },

  removeItem: async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key)
  },
}

export const storage: Storage = secureStorageService
