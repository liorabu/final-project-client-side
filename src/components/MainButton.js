import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default MainButton = (props) => {


    let buttonWidth = '100%';
    let buttonmargin = '0%';

    if(props.width){
        buttonWidth = props.width;
    }

    if(props.margin){
        buttonmargin = props.margin;
    }

    return (
        <TouchableOpacity
            style={[styles.buttonContainer, {width: buttonWidth, margin:buttonmargin, }]}
            onPress={props.onPress}>
            
            <Text style={styles.buttonText}>{props.title}</Text>
        
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#169BD5',
        height: '5%',
        // width: '100%',
        paddingVertical: '3%',
        borderRadius: 3,
        alignSelf: 'center',
    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        top:-4
    }
});