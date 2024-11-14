import { StyleSheet, FlatList, Text } from 'react-native'
import { Href, useRouter } from 'expo-router'
import { PageView } from '@/src/components/PageView'
import Link from '@/src/components/navigation/Link'
import { ThemedText } from '@/src/components/ThemedText'
import Space from '@/src/components/space'
import { usePlayer } from '@/src/contexts/player'
import { useSession } from '@/src/contexts/session'

export default function Menu() {
  const { player } = usePlayer()
  const { signOut } = useSession()
  const router = useRouter()
  const MENU: { key: string; href: Href }[] = [
    {
      key: player ? 'Editar jogador' : 'Adicionar jogador',
      href: '/player/new',
    },
    { key: 'Adicionar time', href: '/team/new' },
  ]

  const handleSignOut = () => {
    signOut()
    router.navigate('/login')
  }

  return (
    <PageView>
      <ThemedText type='title'>Menu</ThemedText>
      <Space size='lg' />
      <FlatList
        data={MENU}
        renderItem={({ item }) => <Link href={item.href} text={item.key} />}
      />
      <Text
        onPress={() => {
          handleSignOut()
        }}
      >
        Sair
      </Text>
    </PageView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
})
