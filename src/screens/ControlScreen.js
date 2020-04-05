import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { CheckBox,Icon, Image ,Overlay  } from 'react-native-elements'

export default ControlScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <View style={styles.questionNumberContainer}>
                    <Text style={styles.questionNumberText}>
                        {`בקרה 1`}
                    </Text>
                </View>
                <Text style={styles.questionText}>מיפוי מערכות וכתיבת מדיניות אבטחת מידע למערכות מחשוב ובקרת חומ"ס </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    questionContainer: {
        borderColor: '#169BD5',
        borderWidth: 3,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 7,
        paddingVertical: 20,
        marginVertical: '20%'
    },

    questionNumberContainer: {
        position: 'absolute',
        top: -18,
        left: 0,
        right: 0,
    },

    questionNumberText: {
        backgroundColor: '#f4f2f4',
        paddingHorizontal: '1%',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    questionText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
});