import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView } from 'react-native';
import QuestionScreen from './src/screens/QuestionScreen';
import HomeScreen from './src/screens/HomeScreen';
import SystemScreen from './src/screens/SystemScreen';
import ControlScreen from './src/screens/ControlScreen'

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Question" component={QuestionScreen} />
          <Stack.Screen name="System" component={SystemScreen} />
          <Stack.Screen name="Control" component={ControlScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

