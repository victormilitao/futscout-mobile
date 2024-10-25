import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Input from './Input'
import { ThemedText } from '../ThemedText'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useState } from 'react'

interface Props<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  error?: string
  defaultValue?: string
}

const Select = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
}: Props<T>) => {
  const [query, setQuery] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>([])
  const [showOptions, setShowOptions] = useState(false)

  const allOptions = ['Fortaleza', 'Sao Paulo', 'Recife']

  const handleSearch = (text: string) => {
    setQuery(text)
    if (text.length > 0) {
      setFilteredOptions(
        allOptions.filter((option) =>
          option.toLowerCase().includes(text.toLowerCase())
        )
      )
      setShowOptions(true)
    } else {
      setShowOptions(false)
    }
  }

  const handleSelect = (option: string) => {
    setQuery(option)
    setShowOptions(false)
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <Input
            control={control}
            name={name}
            label={label}
            placeholder={placeholder || 'Pesquisar...'}
            style={styles.input}
            value={query}
            onChangeText={(text) => onChange(handleSearch(text))}
            error={error}
          />
        )}
      />

      {showOptions && (
        <FlatList
          style={styles.list}
          data={filteredOptions}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <ThemedText style={styles.option}>{item}</ThemedText>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.contentBelow}>
        <ThemedText>Conteúdo abaixo do select</ThemedText>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  list: {
    position: 'absolute',
    top: 50, // ajusta conforme a posição do input
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    zIndex: 10,
    maxHeight: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  option: {
    padding: 10,
  },
  contentBelow: {
    marginTop: 100, // ajuste conforme o layout
  },
})

export default Select
