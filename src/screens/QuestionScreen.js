import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import Answer from '../components/Answer';
import MainButton from '../components/MainButton';
import { getExposureQuestions, saveExposureAnswers, saveExposureLevel, getDamageQuestions, saveDamageAnswers, saveDamageLevel, loadClient } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext'

class QuestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: 0,
            answers: [],
            currentAnswer: null,
            buttonHeight: '8%',
            questionMargin: '20%',
            ButtonTopMargin: '20%'
        }
    }

    componentDidMount() {
        this.loadQuestions();
    }

    //pull the questions from mongodb
    loadQuestions = () => {
        if (this.props.route.params.questionType == 'exposure') {
            getExposureQuestions().then(result => {
                if (!result) {
                    return;
                }
                this.setState({
                    questions: result,
                    answers: []
                });
            }).catch(error => {
                console.log('fail', error);
            });
        }

        else if (this.props.route.params.questionType == 'damage') {
            this.setState({
                buttonHeight: '5.5%',
                questionMargin: '15%',
                ButtonTopMargin: '15%'
            })
            getDamageQuestions().then(result => {
                if (!result) {
                    return;
                }
                this.setState({
                    questions: result,
                    answers: []
                });
            }).catch(error => {
                console.log('fail', error);
            });
        }
    }

    //saving array of the answers for calculating this Exposure number (P)
    saveAnswer = (answerId) => {
        this.setState((prevState) => {
            const newAnswers = [...prevState.answers];
            newAnswers.push(answerId);
            return {
                answers: newAnswers
            }
        });
    }

    //saving the answers in mongodb
    saveAnswerToMongoDb = (questionNumber, answerId) => {
        if (this.props.route.params.questionType == 'exposure') {
            saveExposureAnswers(this.context.userId, this.context.systemId, questionNumber, answerId).then(result => {
                if (!result) {
                    Alert.alert('', 'שמירת התשובה נכשלה, אנא נסה שוב', [{ text: 'אישור' }])
                }
                return;
            }).catch(error => {
                console.log('fail', error);
            });
        }
        else if (this.props.route.params.questionType == 'damage') {
            saveDamageAnswers(this.context.userId, this.context.systemId, questionNumber, answerId).then(result => {
                if (!result) {
                    Alert.alert('', 'שמירת התשובה נכשלה, אנא נסה שוב', [{ text: 'אישור' }])
                }
                return;
            }).catch(error => {
                console.log('fail', error);
            });
        }
    }

    calculateExposureLevel = () => {
        let exposureLevel = 0;
        const answersNumbers = this.state.answers;
        for (let i = 0; i < answersNumbers.length; i++) {
            exposureLevel += answersNumbers[i];
        }
        exposureLevel = exposureLevel / (answersNumbers.length + 1);
        saveExposureLevel(this.context.systemId, exposureLevel).then(result => {
            if (!result) {
                Alert.alert('', 'לא בוצע חישוב רמת חשיפה', [{ text: 'אישור' }])
            }
            return;
        }).catch(error => {
            console.log('fail', error);
        });
    }

    calculateDamageLevel = () => {
        let damageLevel = 0;
        const answersNumbers = this.state.answers;
        for (let i = 0; i < answersNumbers.length; i++) {
            if (answersNumbers[i] > damageLevel)
                damageLevel = answersNumbers[i];
        }
        saveDamageLevel(this.context.systemId, damageLevel).then(result => {
            if (!result) {
                Alert.alert('', 'לא בוצע חישוב רמת חשיפה', [{ text: 'אישור' }])
            }
            return;
        }).catch(error => {
            console.log('fail', error);
        });
    }

    render() {
        if (this.state.questions.length <= 0) {
            return( <View style={styles.container} >
                <Text style={styles.loadinQuestions}>השאלות נטענות,</Text>
                <Text style={styles.loadinQuestions}>אנא המתן</Text>


             </View>
             );
        };
        const { route } = this.props;
        const showQuestion = this.state.questions[this.state.currentQuestion];
        const showAnswers = showQuestion.answers.map((answer, index) => {
            return {
                key: index.toString(),
                text: answer.toString()
            }
        })
        return (
            <ScrollView >
                <View style={styles.container} >
                    <View style={[styles.questionContainer, { marginVertical: this.state.questionMargin }]}>
                        <View style={styles.questionNumberContainer}>
                            <Text style={styles.questionNumberText}>
                                {`שאלה ${showQuestion.number} מתוך ${this.state.questions.length}`}
                            </Text>
                        </View>
                        <Text style={styles.questionText}>{showQuestion.body}</Text>
                    </View>
                    {
                        showAnswers.map((item, index) => {
                            return <Answer
                                key={item.key}
                                text={item.text}
                                selected={index == this.state.currentAnswer}
                                onPress={() => { this.setState({ currentAnswer: index }) }} />
                        })
                    }
                    {
                        this.state.currentQuestion < this.state.questions.length - 1 ?
                            (
                                <MainButton
                                    title="לשאלה הבאה"
                                    onPress={() => {
                                        if (this.state.currentAnswer && this.state.currentAnswer > -1) {
                                            this.saveAnswer(this.state.currentAnswer + 1);
                                            this.saveAnswerToMongoDb(showQuestion.number, this.state.currentAnswer + 1);
                                            this.setState((prevState) => {
                                                return {
                                                    currentQuestion: prevState.currentQuestion + 1,
                                                    currentAnswer: null
                                                };
                                            })
                                        }
                                        else {
                                            console.log(this.state.currentAnswer)
                                            Alert.alert('', ' אנא בחר תשובה', [{ text: 'אישור' }])
                                        }

                                    }}

                                    width="65%" margin="20%" height={this.state.buttonHeight} marginTop={this.state.ButtonTopMargin} />
                            )
                            :
                            (
                                <MainButton
                                    title="סיום"
                                    onPress={() => {
                                        this.saveAnswer(this.state.currentAnswer + 1);
                                        this.saveAnswerToMongoDb(showQuestion.number, this.state.currentAnswer + 1);
                                        if (this.props.route.params.questionType == 'exposure') {
                                            this.calculateExposureLevel();
                                        }
                                        else if (this.props.route.params.questionType == 'damage') {
                                            this.calculateDamageLevel();
                                        }
                                        this.props.navigation.navigate('System');
                                    }}
                                    width="65%" height="20%" height={this.state.buttonHeight} marginTop={this.state.ButtonTopMargin} />
                            )
                    }
                </View >
            </ScrollView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center'
    },
    loadinQuestions: {
      
        fontSize:20,
        textAlign:'center',
       marginBottom:'3%'
    },

    questionContainer: {
        borderColor: '#169BD5',
        borderWidth: 3,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 7,
        paddingVertical: 20,
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
    answer: {
        backgroundColor: '#ffffff'
    }
});

QuestionScreen.contextType = UserContext;
export default QuestionScreen;