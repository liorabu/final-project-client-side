import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import Option from '../components/Option';

export default HomeScreen = ({navigation}) => {
  const question=
  {questionNumber:1, title:'מספר העובדים החשופים למכונות אדם- מכונה (HMI) הקשורים לחומ"ס',answer1:'עד 5', answer2:'5-10', answer3:'10-50',answer4:'מעל 40'}
  
  return (
    <View style={styles.container}>
      <Option text= 'מערכות שהוזנו' onPress={()=>{navigation.navigate('System')}}/>
      <Option text= 'הוסף מערכת' />
      <Option text= 'צור קשר' />
      <Option text= 'שאלות' onPress={()=>{navigation.navigate('Question',{question,totalQuestions:80})}}/>
      <Option text= 'בקרות' onPress={()=>{navigation.navigate('Control')}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
 
  },
 
});