import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store';
import { STORAGE_KEYS } from '../constants/storage-keys';

export interface Storage {
  getItem: (key: STORAGE_KEYS) => Promise<string | null>
  setItem: (key: STORAGE_KEYS, value: string) => Promise<void>
  removeItem: (key: string) => Promise<void>
  clear?: () => Promise<void>
}

export const asyncStorageService: Storage = {
  getItem: async (key: STORAGE_KEYS): Promise<string | null> => {
    return await AsyncStorage.getItem(key.toString())
  },

  setItem: async (key: STORAGE_KEYS, value: string): Promise<void> => {
    await AsyncStorage.setItem(key.toString(), value)
  },

  removeItem: async (key: string): Promise<void> => {
    await AsyncStorage.removeItem(key)
  },

  clear: async (): Promise<void> => {
    await AsyncStorage.clear()
  },
}

const secureStorageService: Storage = {
  getItem: async (key: STORAGE_KEYS): Promise<string | null> => {
    return await SecureStore.getItem(key.toString())
  },

  setItem: async (key: STORAGE_KEYS, value: string): Promise<void> => {
    await SecureStore.setItem(key.toString(), value)
  },

  removeItem: async (key: string): Promise<void> => {
    await SecureStore.deleteItemAsync(key)
  },
}

export const storage: Storage = secureStorageService
export const asyncStorage: Storage = asyncStorageService
