// import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView } from 'react-native';
import QuestionScreen from './src/screens/QuestionScreen';
import HomeScreen from './src/screens/HomeScreen';
import SystemScreen from './src/screens/SystemScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <QuestionScreen questionNumber={1} totalQuestions={36} /> */}
      <SystemScreen />
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

