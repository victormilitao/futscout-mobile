import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Input from './Input'
import { ThemedText } from '../ThemedText'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useState } from 'react'

interface Option {
  id: number
  text: string
}

interface Props<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
  error?: string
  defaultValue?: string
  options: Option[]
}

const Select = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  options,
}: Props<T>): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  const handleSearch = (text: string) => {
    setQuery(text)
    setShowOptions(false)
    if (text.length <= 0) {
      setFilteredOptions([])
      return
    }

    const _filteredOptions = options.filter((option) =>
      option.text.toLowerCase().includes(text.toLowerCase())
    )
    if (_filteredOptions?.length > 0) {
      setFilteredOptions(_filteredOptions)
      setShowOptions(true)
      return
    }
    
  }

  const handleSelect = (option: Option) => {
    setQuery(option.text)
    setSelectedOption(option)
    setShowOptions(false)
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <Input
            control={control}
            name={name}
            label={label}
            placeholder={placeholder || 'Pesquisar...'}
            value={query}
            onChange={() => {
              console.log(selectedOption)
              selectedOption}}
            onChangeText={(text) => {
              console.log('2: ' , selectedOption)
              handleSearch(text)
              onChange(selectedOption)
            }}
            error={error}
          />
        )}
      />

      {showOptions && (
        <FlatList
          style={styles.list}
          data={filteredOptions}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)}>
              <ThemedText style={styles.option}>{item.text}</ThemedText>
            </TouchableOpacity>
          )}
        />
      )}
      <View style={styles.contentBelow}>
        <ThemedText>Conteúdo abaixo do select</ThemedText>
      </View>
      <ThemedText>{selectedOption?.text}</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  list: {
    position: 'absolute',
    top: 47,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 10000,
    maxHeight: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
    overflow: 'hidden'
  },
  option: {
    padding: 10,
  },
  contentBelow: {
    flex: 1,
    marginTop: 30,
  },
})

export default Select
