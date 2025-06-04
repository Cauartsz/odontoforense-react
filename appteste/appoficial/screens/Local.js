// Local.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from './Tema';


const OPENWEATHER_API_KEY = 'fc7a7127f2f599986fcced111dedf74d';


export default function Local() {
  const navigation = useNavigation();
  const { backgroundColor, textColor } = useTheme();
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);


  const carregarDados = async () => {
  setLoading(true);
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão negada', 'Não foi possível acessar a localização');
    setLoading(false);
    return;
  }


  const loc = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = loc.coords;
  setLocation({ latitude, longitude });


  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=pt_br`
    );
    const data = await response.json();


    setWeather({
      cidade: data.name,
      descricao: data.weather[0].description,
      temperatura: data.main.temp,
      sensacao: data.main.feels_like,
    });
  } catch (error) {
    Alert.alert('Erro', 'Falha ao buscar dados do clima');
    console.log(error);
  }


  setLoading(false);
};


  useEffect(() => {
    carregarDados();
  }, []);


  return (
    <View style={[styles.container, { backgroundColor }]}>

      <Text style={[styles.title, { color: textColor }]}>Veja sua localização e informações climáticas!</Text>

      {loading ? (
        <View style={{ alignItems: 'center' }}>
          <ActivityIndicator size="large" color={textColor} />
          <Text style={{ color: textColor, marginTop: 30 }}>Carregando localização e clima...</Text>
        </View>

      ) : weather ? (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%' }}>
          <View style={[styles.weatherBox, { backgroundColor: backgroundColor === '#000000' ? 'rgba(255,255,255,0.1)' : 'rgba(190, 190, 190, 0.1)' }]}>
            <Text style={[styles.info, { color: textColor }]}>Cidade: {weather.cidade};</Text>
            <Text style={[styles.info, { color: textColor }]}>Clima: {weather.descricao};</Text>
            <Text style={[styles.info, { color: textColor }]}>Temperatura: {weather.temperatura}°C;</Text>
            <Text style={[styles.info, { color: textColor }]}>Sensação Térmica: {weather.sensacao}°C;</Text>
            <Text style={[styles.coords, { color: textColor }]}>
              [Lat: {location.latitude.toFixed(3)} | Lon: {location.longitude.toFixed(3)}]
            </Text>
            <Text style={[styles.info, { color: textColor, marginTop: 30 }]}>Informações vindas de OpenWeather API.</Text>
          </View>

          {/* Botão de atualizar só aparece quando não está carregando e há clima */}
          <TouchableOpacity onPress={carregarDados} style={{ marginTop: 20, padding: 10, backgroundColor: '#007AFF', borderRadius: 5 }}>
            <Text style={{ color: '#fff', fontSize: 16 }}>Atualizar</Text>
          </TouchableOpacity>
        </View>

      ) : (
        <Text style={[styles.info, { color: textColor }]}>Não foi possível obter as informações.</Text>
      )}


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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100, 
  },
  title: {
    fontSize: 20,
    marginBottom: 30,
    width: '100%',
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
    textAlign: 'center',
    width: '90%',
  },
  coords: {
    marginTop: 15,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    width: '90%',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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
  weatherBox: {
    backgroundColor: 'rgb(129, 129, 129)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    width: '90%',
    maxWidth: 350,
    marginBottom: 20,
    alignItems: 'center',
  },
});
