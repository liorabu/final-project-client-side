import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
//import { createAppContainer } from 'react-navigation';
//import { createStackNavigator } from 'react-navigation-stack';
import QuestionScreen from './src/screens/QuestionScreen';
import HomeScreen from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <QuestionScreen questionNumber={1} totalQuestions={36} />
      {/* <HomeScreen /> */}
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