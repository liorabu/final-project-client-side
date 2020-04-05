import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

export default HomeScreen = ({navigation}) => {
 
  return (
    <View style={styles.container}>
      <Option text= 'מערכות שהוזנו' onPress={()=>{navigation.navigate('Systems')}}/>
      <Option text= 'הוסף מערכת' />
      <Option text= 'צור קשר' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
 
  },
 
});