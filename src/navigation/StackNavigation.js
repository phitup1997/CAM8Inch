import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import PokemonDetailScreen from '../screens/PokemonDetailScreen';
import RouteKey from './RouteKey';

const Stack = createNativeStackNavigator();

export const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={RouteKey.HomeScreen} component={HomeScreen} />
      <Stack.Screen
        name={RouteKey.PokemonDetailScreen}
        component={PokemonDetailScreen}
      />
    </Stack.Navigator>
  );
};
