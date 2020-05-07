import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Answer from '../components/Answer';
import MainButton from '../components/MainButton';

// var radio_props = [
//     {label: 'param1', value: 0 },
//     {label: 'param2', value: 1 }
//   ];

export default QuestionScreen = (props) => {
    const { route } = props;
    const [answer, setAnswer] = useState('answer1');

    // 1. load the questions []
    // 2. [] -> state
    // 3. this.state = { currentQuestion: 0 }
    // 4. render()
    //          this.state.questions[ this.state.currentQuestion ]
    // 5. this.setState({ currentQuestion: currentQuestion + 1 }) ***
    // 6. if(this.state.currentQuestion >= 3){ ...save }


    return (
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <View style={styles.questionNumberContainer}>
                    <Text style={styles.questionNumberText}>
                        {`שאלה ${route.params.question.questionNumber} מתוך ${route.params.totalQuestions}`}
                    </Text>
                </View>
                <Text style={styles.questionText}>{route.params.question.title}</Text>
            </View>

            {/* <RadioForm
            radio_props={radio_props}
            initial={1}
            //onPress={(value) => {this.setState({value:value})}}
          /> */}

            <View>
                <Answer text={route.params.question.answer1} onPress={() => { console.warn('1'), setAnswer('answer1'); }} />
                <Answer text={route.params.question.answer2} onPress={() => { console.warn('2'), setAnswer('answer2'); }} />
                <Answer text={route.params.question.answer3} onPress={() => { console.warn('3'), setAnswer('answer3'); }} />
                <Answer text={route.params.question.answer4} onPress={() => { console.warn('4'), setAnswer('answer4'); }} />
            </View>

            <MainButton
                title="לשאלה הבאה"
                onPress={() => { console.warn('next!'); }}
                width="65%" margin="20%" top = {15} />
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
    answer:{
        backgroundColor:'#ffffff'
    }
});
