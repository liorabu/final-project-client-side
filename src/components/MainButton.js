import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

export default MainButton = (props) => {

    let buttonWidth = '100%';
    let buttonmargin = '0%';
    let buttonHeight = '8%';
    let buttonMarginTop = '12%';

    if (props.width) {
        buttonWidth = props.width;
    }

    if (props.margin) {
        buttonmargin = props.margin;
    }
    if (props.height) {
        buttonHeight = props.height;
    }
    if (props.marginTop) {
        buttonMarginTop = props.marginTop;
    }




    return (
        <TouchableOpacity
            style={[styles.buttonContainer, { width: buttonWidth, margin: buttonmargin, height: buttonHeight, marginTop: buttonMarginTop }]}
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
        // justifyContent: 'center',
        alignItems: 'center'

    },

    buttonText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        flexDirection: 'column',
        alignSelf: 'center',
        // justifyContent: 'center',
    }
});