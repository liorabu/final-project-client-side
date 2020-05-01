import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default MainButton = (props) => {

    let buttonWidth = '100%';
    let buttonmargin = '0%';
    let buttonHeight='8%';
    let buttomtop=props.top;

    if(props.width){
        buttonWidth = props.width;
    }

    if(props.margin){
        buttonmargin = props.margin;
    }
    if(props.height){
        buttonHeight=props.height;
    }

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, {width: buttonWidth, margin:buttonmargin, height:buttonHeight, }]}
            onPress={props.onPress}
            >
            
            <Text style={styles.buttonText}>{props.title}</Text>
        
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#169BD5',
        paddingVertical: '3%',
        borderRadius: 5,
        alignSelf: 'center',
       
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        top:4,
        fontSize:20,
        flexDirection:'column',
        alignSelf:'center',
       textAlign:'center',
     top:'8%'
    }
});