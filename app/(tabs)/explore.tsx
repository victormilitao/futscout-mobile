import BasicScrollView from '@/components/BasicScrollView'
import Info from '@/components/Info'
import { PageView } from '@/components/PageView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import UserHeader from '@/components/UserHeader'
import Space from '@/components/space'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, View } from 'react-native'

export default function Progress() {
  return (
    <PageView>
      <UserHeader />
      <Space size="lg" />
      <BasicScrollView style={{height: '100%'}}>
        <ThemedText type="subtitle">Meu ano de 2024</ThemedText>
        <View style={styles.section}>
          <ThemedView style={styles.sectionContent}>
            <Info style={styles.yearDetails}>
              <View style={styles.yearInfo}>
                <Ionicons size={20} style={[]} name="git-compare" />
                <ThemedText>Jogos</ThemedText>
              </View>
              <ThemedText
                type="title"
                colorType="infoText"
                style={styles.yearInfoFooter}
              >
                15
              </ThemedText>
            </Info>
            <Info style={styles.yearDetails}>
              <View style={styles.yearInfo}>
                <Ionicons size={20} style={[]} name="football" />
                <ThemedText>Gols</ThemedText>
              </View>
              <ThemedText
                type="title"
                colorType="infoText"
                style={styles.yearInfoFooter}
              >
                9
              </ThemedText>
            </Info>
            <Info style={styles.yearDetails}>
              <View style={styles.yearInfo}>
                <Ionicons size={20} style={[]} name="footsteps" />
                <ThemedText>Assist</ThemedText>
              </View>
              <ThemedText
                type="title"
                colorType="infoText"
                style={styles.yearInfoFooter}
              >
                4
              </ThemedText>
            </Info>
          </ThemedView>
        </View>

        <Space size="lg" />

        <ThemedText type="subtitle">Equipes que joguei</ThemedText>
        <View style={[styles.section, styles.competitionInfo]}>
          <Info>
            <ThemedText type="defaultSemiBold" colorType="infoText">
              Ferroviário
            </ThemedText>
          </Info>
          <Info>
            <ThemedText type="defaultSemiBold" colorType="infoText">
              Uniclinic
            </ThemedText>
          </Info>
          <Info>
            <ThemedText type="defaultSemiBold" colorType="infoText">
              Fortaleza
            </ThemedText>
          </Info>
          <Info>
            <ThemedText type="defaultSemiBold" colorType="infoText">
              Juniors
            </ThemedText>
          </Info>
        </View>

        <Space size="lg" />

        <ThemedText type="subtitle">Competições</ThemedText>
        <View style={[styles.section, styles.competitionInfo]}>
          <Info>
            <ThemedText type="defaultSemiBold" colorType="infoText">
              Liga LFA
            </ThemedText>
          </Info>
          <Info>
            <ThemedText type="defaultSemiBold" colorType="infoText">
              Torneio juniores
            </ThemedText>
          </Info>
        </View>
      </BasicScrollView>
    </PageView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    paddingTop: 10,
  },
  sectionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  yearDetails: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    height: 100,
  },
  yearInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    width: '100%',
  },
  yearInfoFooter: {
    alignSelf: 'flex-start',
  },
  competitionInfo: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
})
