//Storage.js
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, FlatList, Alert, Share } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../screens/Tema';
import React, { useState, useEffect } from 'react';

//Moods disponíveis
const moods = [
  { emoji: '🤩', label: 'Boa' },
  { emoji: '😅', label: 'Razoável' },
  { emoji: '😑', label: 'Ruim' },
];

//Navegação + Tema + Save no armazenamento e Compartilhamento
export default function Storage() {
  const navigation = useNavigation();
  const { backgroundColor, textColor, boxBackground } = useTheme();
  const [history, setHistory] = useState([]);

    const saveMood = async (mood) => {
    const entry = {
      mood,
      date: new Date().toLocaleString(),
    };
    const updatedHistory = [entry, ...history];
    setHistory(updatedHistory);
    await AsyncStorage.setItem('appAvaliator', JSON.stringify(updatedHistory));
    Alert.alert('Avaliação registrada!', `Está gostando? Compartilhe! Sua avaliação: ${mood.label}`);
  };
  const loadHistory = async () => {
    const stored = await AsyncStorage.getItem('appAvaliator');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  };
  useEffect(() => {
    loadHistory();
  }, []);
  const shareLastMood = async () => {
    if (history.length === 0) {
      Alert.alert('Nenhuma avaliação registrada...');
      return;
    }
    const last = history[0];
    try {
      await Share.share({
        message: `Essa foi a minha avaliação do aplicativo de Cauã: ${last.mood.emoji} ${last.mood.label} — registrado no appAvaliator`,
      });
    } catch (error) {
      Alert.alert('Erro ao compartilhar', error.message);
    }
  };

//Tela
  return (
    <View style={[{ flex: 1, backgroundColor }]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.text, { color: textColor }]}>
          Salve sua avaliação no armazenamento!
        </Text>
      </View>

      <View style={styles.container}>
        <Text style={[styles.title, { color: textColor }]}>Qual está sendo sua experiência com o aplicativo até agora?</Text>

        <View style={styles.moodOptions}>
            {moods.map((mood) => (
            <TouchableOpacity
                key={mood.emoji}
                style={styles.moodButton}
                onPress={() => saveMood(mood)}>
                <Text style={[styles.moodEmoji, { color: textColor }]}>{mood.emoji}</Text>
                <Text style={[styles.moodLabel, { color: textColor }]}>{mood.label}</Text>
            </TouchableOpacity>
            ))}
        </View>

        <TouchableOpacity style={styles.shareButton} onPress={shareLastMood}>
            <Text style={styles.shareText}>Compartilhar reação</Text>
        </TouchableOpacity>

        <Text style={[styles.subtitle, { color: textColor }]}>📅 Histórico recente 📅</Text>
        <FlatList
          data={history}
          contentContainerStyle={{ paddingBottom: 10 }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={[styles.historyText, { color: textColor }]}>{item.date}</Text>
              <Text style={[styles.historyMood, { color: textColor }]}>{item.mood.emoji} {item.mood.label}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ marginTop: 10, color: '#999' }}>Nenhum registro ainda.</Text>}/>
        </View>


      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(255, 75, 75)' }]}
          onPress={() => navigation.navigate('Local')}>
          <Image source={require('../assets/map.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(84, 169, 255)' }]}
          onPress={() => navigation.navigate('Camera')}>
          <Image source={require('../assets/camera.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(240, 206, 13)' }]}
          onPress={() => navigation.navigate('Storage')}>
          <Image source={require('../assets/archive.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(19, 216, 150)' }]}
          onPress={() => navigation.navigate('Config')}>
          <Image source={require('../assets/cog.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginTop: 60,
    textAlign: 'center',
    width: '100%',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 30,
    width: '100%',
    marginBottom: 100,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  icon: {
    width: 35,
    height: 35,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '90%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  switchLabel: {
    fontSize: 18,
    width: '100%',
  },
  moodOptions: {
    flexDirection: 'row',
    width: '75%',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 50,
    textAlign: 'center'
  },
  moodButton: {
    alignItems: 'center',
    textAlign: 'center'
  },
  moodEmoji: {
    fontSize: 40,
    textAlign: 'center'
  },
  moodLabel: {
    width: '110%',
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center'
  },
  shareButton: {
    width: '57%',
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  shareText: {
    width: '100%',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
    title: {
    width: '90%',
    fontSize: 16,
    marginBottom: 20,
    marginTop: 60,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    width: '100%',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  historyItem: {
    width: '140%',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyText: {
    alignItems: 'center',
    width: '100%',
    fontSize: 14,
    color: '#555',
  },
  historyMood: {
    alignItems: 'center',
    width: '100%',
    fontSize: 18,
  },
});
