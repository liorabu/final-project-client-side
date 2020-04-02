import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default Answer = (props) => {

    return (
        <TouchableOpacity style={styles.answerContainer} onPress={props.onPress}>
            <Text style={styles.answerText}>{props.text}</Text>
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