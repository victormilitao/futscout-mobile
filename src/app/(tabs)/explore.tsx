import BasicScrollView from '@/src/components/BasicScrollView'
import Info from '@/src/components/Info'
import { PageView } from '@/src/components/PageView'
import { ThemedText } from '@/src/components/ThemedText'
import { ThemedView } from '@/src/components/ThemedView'
import UserHeader from '@/src/components/UserHeader'
import Space from '@/src/components/space'
import { UserContext } from '@/src/contexts/user'
import { Ionicons } from '@expo/vector-icons'
import { useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'

export default function Progress() {
  const { dashboardByYear, getDashboardByYear } = useContext(UserContext)

  useEffect(() => {
    getDashboardByYear()
  }, [])

  return (
    <PageView>
      <UserHeader />
      <Space size="lg" />
      <BasicScrollView style={{ height: '100%' }}>
        <ThemedText type="subtitle">Meu ano de {dashboardByYear?.year}</ThemedText>
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
                {dashboardByYear?.attributs?.matches}
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
                {dashboardByYear?.attributs?.scores}
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
                {dashboardByYear?.attributs?.assists}
              </ThemedText>
            </Info>
          </ThemedView>
        </View>

        <Space size="lg" />

        <ThemedText type="subtitle">Equipes que joguei</ThemedText>
        <View style={[styles.section, styles.competitionInfo]}>
          {dashboardByYear?.attributs?.teams.map((team, index) => (
            <Info key={index}>
              <ThemedText type="defaultSemiBold" colorType="infoText">
                {team.name}
              </ThemedText>
            </Info>
          ))}
        </View>

        <Space size="lg" />

        <ThemedText type="subtitle">Competições</ThemedText>
        <View style={[styles.section, styles.competitionInfo]}>
          {dashboardByYear?.attributs?.competitions.map((competition, index) => (
            <Info key={index}>
              <ThemedText type="defaultSemiBold" colorType="infoText">
                {competition?.name}
              </ThemedText>
            </Info>
          ))}
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
