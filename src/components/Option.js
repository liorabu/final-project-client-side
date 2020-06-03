import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default Option = (props) => {
let backgroundColor;
let fontColor='black';
let borderColor= '#169BD5';

if(props.disable){
    backgroundColor="#BEBEBE";
    fontColor="#FFFFFF";
    borderColor="#BEBEBE"

}

    return (
        <TouchableOpacity style={[styles.optionContainer,{backgroundColor:backgroundColor,borderColor:borderColor}]} onPress={props.onPress}>
            <Text style={[styles.optionText,{color:fontColor}]} >{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
   
    optionContainer: {
    //   borderColor: '#169BD5',
      borderWidth: 3,
      width: '85%',
      alignSelf: 'center',
      borderRadius: 10,
      paddingVertical: 13,
       marginVertical: '1%',  
    },
    optionText: {
      textAlign: 'center',
      fontSize:20,
      fontWeight:'bold'
  },
  });