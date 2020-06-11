import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView } from 'react-native';
import QuestionScreen from './src/screens/QuestionScreen';
import UserDetailsScreen from './src/screens/UserDetailsScreen';
import HomeScreen from './src/screens/HomeScreen';
import SystemsScreen from './src/screens/SystemsScreen';
import ControlScreen from './src/screens/ControlScreen';
import SystemScreen from './src/screens/SystemScreen';
import SystemDetailsScreen from './src/screens/SystemDetailsScreen';
import NewSystemScreen from './src/screens/NewSystemScreen';
import LoginScreen from './src/screens/LoginScreen';
import ContactScreen from './src/screens/ContactScreen';
import { UserContext } from './src/contexts/UserContext';
import { createSwitchNavigator } from 'react-navigation';


const Stack = createStackNavigator();

export default function App() {
  const [userId, setUserId] = React.useState(0);
  // const [userId, setUserId] = React.useState(0);
  const [userName, setUserName] = React.useState(null);
  const [systemId, setSystemId] = React.useState(0);
  const [systemName, setSystemName] = React.useState(null);
  const value = { userId, setUserId, systemId, setSystemId, userName, setUserName,systemName, setSystemName };

  return (
    <UserContext.Provider value={value}>
      <SafeAreaView style={{ flex: 1 }}>

        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: userName, headerTitleAlign: 'center', headerTintColor: '#fff', headerLeft: null, headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} options={{ title: 'פרטי מפעל', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="Question" component={QuestionScreen} options={{ title: 'שאלות', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="Systems" component={SystemsScreen} options={{ title: 'מערכות קיימות', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="Control" component={ControlScreen} options={{ title: 'בקרות', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="System" component={SystemScreen} options={{ title: systemName, headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="SystemDetails" component={SystemDetailsScreen} />
            <Stack.Screen name="Contact" component={ContactScreen} />
            <Stack.Screen name="NewSystem" component={NewSystemScreen} options={{ title: 'הוספת מערכת', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </UserContext.Provider>
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

