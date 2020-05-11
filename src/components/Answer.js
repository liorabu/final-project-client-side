import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default Answer = (props) => {

    selectedStyle = {};
    selectedTouchableStyle = {};
    if(props.selected){
        selectedStyle = {
            fontWeight: 'bold',
        },
        selectedTouchableStyle = {
            backgroundColor:'#D3D3D3'
        }

    }

    return (
        <TouchableOpacity style={[styles.answerContainer,selectedTouchableStyle]} onPress={props.onPress}>
            <Text style={[styles.answerText, selectedStyle]}>{props.text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    answerContainer: {
        borderTopColor: '#666666',
       borderTopWidth: 1,
        borderBottomColor: '#666666',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    answerText: {
        fontSize: 16,
        alignSelf: 'flex-start',
    }
});