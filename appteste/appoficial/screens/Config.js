//Config.js
import React from 'react';
import { View, Text, Switch, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../screens/Tema';

//Navegação + Usar Tema
export default function Config() {
    const navigation = useNavigation();
    const { isDarkMode, toggleTheme, backgroundColor, textColor, boxBackground } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView contentContainerStyle={styles.scroll}>

        <Text style={[styles.title, { color: textColor }]}>
          Modifique as configurações do aplicativo!
        </Text>

        <View style={[styles.switchBox, { backgroundColor: boxBackground }]}>
          <Text style={[styles.switchLabel, { color: textColor }]}>
            {isDarkMode ? 'Modo claro' : 'Modo escuro'}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor="#f4f3f4"
            trackColor={{ false: "#767577", true: "#81b0ff" }}/>
        </View>

        <TouchableOpacity
            style={[styles.themeButton, { backgroundColor: isDarkMode ? '#333333' : '#dddddd' }]}
            onPress={() => navigation.navigate('Home')}>
            <Text style={[styles.themeButtonText, { color: textColor }]}>Voltar para o início      </Text>
        </TouchableOpacity>
      </ScrollView>


      {/* MENU */}
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
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  switchBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '90%',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  switchLabel: {
    fontSize: 18,
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
  themeButton: {
  marginTop: 30,
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 10,
  alignItems: 'center',
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
},

themeButtonText: {
  fontSize: 16,
  fontWeight: 'bold',
},
});
