import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import Option from '../components/Option';

export default HomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Option text= 'מערכות שהוזנו' onPress={()=>{navigation.navigate('System')}}/>
      <Option text= 'הוסף מערכת' />
      <Option text= 'צור קשר' />
      <Option text= 'bcfvbfghfghשר' onPress={()=>{navigation.navigate('Question',{questionNumber:77,totalQuestions:80})}}/>
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