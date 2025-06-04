// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './screens/Tema';


import Home from './screens/Home';
import Chat from './screens/Chat';
import Config from './screens/Config';
import Local from './screens/Local';
import Storage from './screens/Storage';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="Local" component={Local} />
          <Stack.Screen name="Storage" component={Storage} />
          <Stack.Screen name="Config" component={Config} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
