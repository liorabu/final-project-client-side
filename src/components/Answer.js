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

    renderText = (value) => {
        if(typeof(value) == "object" && value.answer && value.answer.length > 0){
            // we got an array
            return value.answer.map((item, index) => {
                return <Text
                    key={`${value.key}_${index}`}
                    style={[styles.answerText, selectedStyle]}>{item}</Text>;
            });
        }

        return <Text style={[styles.answerText, selectedStyle]}>{value}</Text>;
    }

    // const opacity = props.selected ? 1 : 0.4;

    return (
        <View style={[styles.answerContainer, selectedTouchableStyle]}>
            <CheckBox
                value={props.selected}
                onValueChange={props.onPress}
            />
            
            {/* <Text style={{opacity, color: 'green'}}>נבחר</Text> */}

            <TouchableOpacity style={{flex: 1}} onPress={props.onPress}>
                <>
                    { renderText(props.text) }
                </>
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
        alignSelf: 'flex-start'
    }
});