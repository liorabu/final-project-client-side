import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import Option from '../components/Option';

  class HomeScreen extends React.Component {
    constructor(props){
      super(props);
    }
    render(){
      // let userId = this.context;
      // console.log('fdfs' + userId);
  return (
    <View style={styles.container}>
      <Option text= 'מערכות שהוזנו' onPress={()=>{this.props.navigation.navigate('Systems')}}/>
      <Option text= 'הוסף מערכת' onPress={()=>{this.props.navigation.navigate('NewSystem')}} />
      <Option text= 'צור קשר' />
   
    </View>
  )
}
  }
  
  // HomeScreen.contextType = userId;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
 
  },
 
});
export default HomeScreen;