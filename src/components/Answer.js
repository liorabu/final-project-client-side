import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export default Answer = (props) => {

    selectedStyle = {};
    selectedTouchableStyle = {};
    if (props.selected) {
        selectedStyle = {
            fontWeight: 'bold',
        },
            selectedTouchableStyle = {
                backgroundColor: '#D3D3D3'
            }

    }

    return (
        <View style={[styles.answerContainer, selectedTouchableStyle]}>
            <CheckBox
                value={props.selected}
                onValueChange={() => props.onPress}
            />
            <TouchableOpacity  onPress={props.onPress}>
                <Text style={[styles.answerText, selectedStyle]}>{props.text}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    answerContainer: {
        borderTopColor: '#666666',
        borderTopWidth: 1,
        borderBottomColor: '#666666',
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        flexDirection:'row',
        width:'100%'
    },
    answerText: {
        fontSize: 16,
        alignSelf: 'flex-start',
    }
});