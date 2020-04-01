import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import Option from '../components/Option';

export default HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Option text= 'מערכות שהוזנו' />
      <Option text= 'הוסף מערכת' />
      <Option text= 'צור קשר' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginVertical: '20%'
  },
 
});