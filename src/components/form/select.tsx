import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native'
import Input from './Input'
import { ThemedText } from '../ThemedText'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { useEffect, useState } from 'react'

export interface Option {
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
  handleOption: (option: Option | null) => void
}

const Select = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  options,
  handleOption
}: Props<T>): JSX.Element => {
  const [query, setQuery] = useState<string>('')
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([])
  const [selectedOption, setSelectedOption] = useState<Option | null>()
  const [showOptions, setShowOptions] = useState(false)

  const handleSearch = (text: string) => {
    setQuery(text)
    setSelectedOption(null)
    handleOption(null)
  }

  useEffect(() => {
    setShowOptions(false)
    console.log('query: ',query)
    if (query.length <= 0 || options?.length <= 0) {
      setFilteredOptions([])
      return
    }

    const _filteredOptions = options.filter((option) =>
      option.text.toLowerCase().includes(query.toLowerCase())
    )
    console.log('_filteredOptions: ',_filteredOptions)

    if (_filteredOptions?.length > 0 && !selectedOption) {
      setFilteredOptions(_filteredOptions)
      setShowOptions(true)
      return
    }
  }, [options, query])

  const handleSelect = (option: Option) => {
    setQuery(option.text)
    setShowOptions(false)
    setSelectedOption(option)
    handleOption(option)
  }

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => (
          <View>
            <Input
              control={control}
              name={name}
              label={label}
              placeholder={placeholder || 'Pesquisar...'}
              value={query}
              onChangeText={(text) => {
                handleSearch(text)
                onChange(text)
              }}
              error={error}
            />

            {showOptions && (
              <FlatList
                style={styles.list}
                data={filteredOptions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      handleSelect(item)
                    }}
                  >
                    <ThemedText style={styles.option}>{item.text}</ThemedText>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 10000
  },
  list: {
    position: 'absolute',
    top: 71,
    width: '100%',
    backgroundColor: '#fff',
    zIndex: 10000,
    maxHeight: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderBottomEndRadius: 5,
    overflow: 'hidden',
  },
  option: {
    padding: 10,
  },
})

export default Select
