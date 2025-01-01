import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ChatBotScreen from '../screens/ChatBotAiScreen';
import ChatBotCityScreen from '../screens/ChatBotCityScreen';
import HomeScreen from '../screens/HomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ChatBotRecipeScreen from '../screens/ChatBotAiRecipeScreen';
import ChatBotQuoteScreen from '../screens/ChatBotAiMotivation';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatBot" component={ChatBotScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatBotCity" component={ChatBotCityScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatBotRecipe" component={ChatBotRecipeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ChatBotQuote" component={ChatBotQuoteScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
