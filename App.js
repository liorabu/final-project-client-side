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
import {UserContext} from './src/contexts/UserContext';
import { createSwitchNavigator } from 'react-navigation';


const Stack = createStackNavigator();

export default function App() {
  const [userId, setUserId] = React.useState(0);
  // const [userId, setUserId] = React.useState(0);
const [systemId, setSystemId] =React.useState(0);
  const value = { userId, setUserId, systemId, setSystemId};

  return (
    <UserContext.Provider value={value}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* createSwitchNavigator({ */}
        <NavigationContainer>
          <Stack.Navigator >
            <Stack.Screen name="Login" component={LoginScreen}  options={{headerShown: false}}/>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'חומר אפל', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
            <Stack.Screen name="Question" component={QuestionScreen} />
            <Stack.Screen name="Systems" component={SystemsScreen} options={{ title: 'מערכות קיימות', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="Control" component={ControlScreen} />
            <Stack.Screen name="System" component={SystemScreen} options={{ title: 'אפשרויות', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
            <Stack.Screen name="SystemDetails" component={SystemDetailsScreen} />
            <Stack.Screen name="NewSystem" component={NewSystemScreen} options={{ title: 'הוספת מערכת', headerTitleAlign: 'center', headerTintColor: '#fff', headerStyle: { backgroundColor: '#027DB4' } }} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* }) */}
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

