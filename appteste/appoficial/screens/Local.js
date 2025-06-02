// Local.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import * as Location from 'expo-location';
import { useTheme } from './Tema';

const OPENWEATHER_API_KEY = 'fc7a7127f2f599986fcced111dedf74d'; // ⬅️ Coloque sua API key aqui

export default function Local() {
  const { backgroundColor, textColor } = useTheme();
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      // Solicitar permissão de localização
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível acessar a localização');
        setLoading(false);
        return;
      }

      // Obter localização atual
      const loc = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loc.coords;
      setLocation({ latitude, longitude });

      try {
        // Buscar clima na OpenWeatherMap
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
        const data = await response.json();
      console.log(data, error); // <-- Isso ajuda a identificar se veio erro 401 ou 404
      }


      setLoading(false);
    })();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {loading ? (
        <ActivityIndicator size="large" color={textColor} />
      ) : weather ? (
        <>
          <Text style={[styles.title, { color: textColor }]}>Você está em:</Text>
          <Text style={[styles.info, { color: textColor }]}>Cidade: {weather.cidade}</Text>
          <Text style={[styles.info, { color: textColor }]}>Clima: {weather.descricao}</Text>
          <Text style={[styles.info, { color: textColor }]}>Temperatura: {weather.temperatura}°C</Text>
          <Text style={[styles.info, { color: textColor }]}>Sensação Térmica: {weather.sensacao}°C</Text>
          <Text style={[styles.coords, { color: textColor }]}>
            [Lat: {location.latitude.toFixed(3)} | Lon: {location.longitude.toFixed(3)}]
          </Text>
        </>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 100, // ← Adiciona espaço para o menu fixo
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 5,
  },
  coords: {
    marginTop: 15,
    fontSize: 14,
    fontStyle: 'italic',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 100,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff20', // Opcional: leve fundo transparente
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
});
