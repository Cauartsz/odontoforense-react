//Home.js
import React from 'react';
import { TouchableOpacity, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../screens/Tema';


//Navegação + Usar Tema
export default function Home() {
    const navigation = useNavigation();
    const { backgroundColor, textColor, boxBackground, isDarkMode } = useTheme();


  return (
    <View style={[{ flex: 1, backgroundColor }]}>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={[styles.text, { color: textColor }]}>⭐ Bem vindo ao ReactTest! ⭐</Text>
      

        <View style={[styles.infoBox, { backgroundColor: '#9e12c9' }]}>
          <Text style={[styles.infoText, { color: isDarkMode ? '#ffffff' : '#ffffff' }]}>
            Olá, fui desenvolvido por Cauã, estudante de ADS do SENAC no 3º período como atividade de desenvolvimento mobile utilizando React Native! Nos Cards você verá as telas e funções deste App!
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: 'rgba(158, 18, 201, 0.4)' }]}>
          <Text style={[styles.infoText, { color: isDarkMode ? '#ffffff' : '#ffffff' }]}>
            Home: Essa tela que estamos agora, [...]
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: 'rgb(19, 216, 150)' }]}>
          <Text style={[styles.infoText, { color: isDarkMode ? '#ffffff' : '#ffffff' }]}>
            Configurações:
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: isDarkMode ? '#665544' : '#ffddb3' }]}>
          <Text style={[styles.infoText, { color: textColor }]}>
            Armazenamento na memória e compartilhamento:
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: isDarkMode ? '#444466' : '#d2ccff' }]}>
          <Text style={[styles.infoText, { color: textColor }]}>
            Mapa e clima:
          </Text>
        </View>

        <View style={[styles.infoBox, { backgroundColor: isDarkMode ? '#334455' : '#b3e5fc' }]}>
          <Text style={[styles.infoText, { color: textColor }]}>
            Chat com LLM:
          </Text>
        </View>

      </ScrollView>

      <View style={styles.menuContainer}>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(255, 75, 75)' }]}
          onPress={() => navigation.navigate('Local')}>
          <Image source={require('../assets/map.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'rgb(84, 169, 255)' }]}
          onPress={() => navigation.navigate('Chat')}>
          <Image source={require('../assets/chat.png')} style={[styles.icon, { tintColor: '#ffffff' }]} />
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
  container: {
    paddingTop: 100,
    paddingBottom: 700,
    paddingHorizontal: 0,
    backgroundColor: '# ffffsf',
    textAlign: 'center'
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginVertical: 30,
    width: '100%',
    paddingBottom: 70,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  icon: {
    width: 35,
    height: 35
  },
  infoBox: {
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});
