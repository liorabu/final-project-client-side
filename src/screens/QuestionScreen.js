import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Answer from '../components/Answer'
import MainButton from '../components/MainButton';

export default QuestionScreen = (props) => {
    const {route}=props;
  return (
    <View style={styles.container}>
        <View style={styles.questionContainer}>
            <View style={styles.questionNumberContainer}>
                <Text style={styles.questionNumberText}>
                    {`שאלה ${route.params.questionNumber} מתוך ${route.params.totalQuestions}`}
                </Text>
            </View>
            <Text style={styles.questionText}>מספר העובדים החשופים למערכות
אדם - מכונה (HMI) הקשורים לחומ"ס</Text>
        </View>

        <View>
            <Answer text="עד 5" onPress={() => { console.warn('1'); }} />
            <Answer text="5-10" onPress={() => { console.warn('2'); }} />
            <Answer text="10-50" onPress={() => { console.warn('3'); }} />
            <Answer text="מעל 50" onPress={() => { console.warn('4'); }} />
        </View>

        <MainButton
            title="לשאלה הבאה"
            onPress={() => { console.warn('next!'); }}
            width="65%" margin="20%" />
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
        top:-18,
        left: 0,
        right: 0,
    },

    questionNumberText: {
        backgroundColor: 'white',
        alignSelf: 'center',
        fontSize:20,
        fontWeight:'bold',
    },

    questionText: {
        textAlign: 'center',
        fontSize:20,
        fontWeight:'bold'
    },
});
