import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import Answer from '../components/Answer';
import MainButton from '../components/MainButton';
import { getExposureQuestions, saveExposureAnswers, saveExposureLevel, getDamageQuestions, saveDamageAnswers, saveDamageLevel, getAnswers, loadClient } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';
import { Modal } from 'react-native';

class QuestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            currentQuestion: 1,
            answers: [],
            currentAnswer: null,
            buttonHeight: '8%',
            questionMargin: '20%',
            ButtonTopMargin: '20%',
            descriptionModal: true,
        }
    }

    componentDidMount() {
        this.loadQuestions();
        this.loadMyAnswers();
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
                });
            }).catch(error => {
                console.log('fail', error);
            });

        }

    }

    // get the answers of the system for show them
    loadMyAnswers = () => {
        getAnswers(this.context.systemId, this.props.route.params.questionType).then(result => {
            if (!result) {
                return;
            }
            else if (result.length > 0) {

                const existsAnswer = result.find((item) => item.questionNumber == this.state.currentQuestion)

                this.setState({
                    answers: result,
                    currentAnswer: (!existsAnswer) ? null : existsAnswer.answerId - 1
                });
            }
            else if (result.length == 0) {
                this.setState({
                    answers: []
                });
            }
        }).catch(error => {
            console.log('fail', error);
        });
    }

    //saving array of the answers for calculating this Exposure number (P)
    saveAnswer = (questionId, answerId) => {
        this.setState((prevState) => {
            const newAnswers = [...prevState.answers];
            const answerIndex = newAnswers.findIndex((item) => item.questionNumber == questionId);

            if (answerIndex <= -1) {
                newAnswers.push({
                    questionNumber: questionId,
                    answerId: answerId
                });
            }
            else {
                newAnswers[answerIndex]['answerId'] = answerId;
            }
            return {
                answers: newAnswers
            }
        });

        if (this.state.answers.length == this.state.questions.length) {
            if (this.props.route.params.questionType == 'exposure') {
                this.calculateExposureLevel();
            }
            else if (this.props.route.params.questionType == 'damage') {
                this.calculateDamageLevel();
            }
        }
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

            exposureLevel += answersNumbers[i].answerId;
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
            if (answersNumbers[i].answerId > damageLevel)
                damageLevel = answersNumbers[i].answerId;
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
    onCloseDescription = () => {
        this.setState({
            descriptionModal: false,
        });
    }

    render() {
        if (this.state.questions.length <= 0) {
            return (
                <View style={styles.container} >
                    <Text style={styles.loadinQuestions}>השאלות נטענות,</Text>
                    <Text style={styles.loadinQuestions}>אנא המתן</Text>
                </View>
            );
        };
        const { route } = this.props;
        const showQuestion = this.state.questions[this.state.currentQuestion - 1];
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
                    {this.props.route.params.questionType == 'damage' ?
                        showAnswers.map((item, index) => {

                            return (
                                <Answer
                                    key={item.key}
                                    text={item.text}
                                    selected={index == this.state.currentAnswer}
                                    onPress={() => { this.setState({ currentAnswer: index }) }} />
                            )
                            }) 
                        :


                        showAnswers.map((item, index) => {

                            return (
                                <Answer
                                    key={item.key}
                                    text={item.text}
                                    selected={index == this.state.currentAnswer}
                                    onPress={() => { this.setState({ currentAnswer: index }) }} />
                            )
                        })

                    }
                    {
                        this.state.currentQuestion < this.state.questions.length ?
                            (
                                <MainButton
                                    title="לשאלה הבאה"
                                    onPress={() => {
                                        if (this.state.currentAnswer != null && this.state.currentAnswer > -1) {
                                            this.saveAnswer(showQuestion.number, this.state.currentAnswer + 1);
                                            this.saveAnswerToMongoDb(showQuestion.number, this.state.currentAnswer + 1);
                                            this.setState((prevState) => {
                                                const newQuestionId = prevState.currentQuestion + 1;
                                                const existsAnswer = prevState.answers.find((item) => item.questionNumber == newQuestionId)
                                                return {
                                                    currentQuestion: newQuestionId,
                                                    currentAnswer: (!existsAnswer) ? null : existsAnswer.answerId - 1
                                                };
                                            })
                                        }
                                        else {
                                            Alert.alert('', ' אנא בחר תשובה', [{ text: 'אישור' }])
                                        }

                                    }}

                                    width="65%" height={this.state.buttonHeight} marginTop={this.state.ButtonTopMargin} />
                            )
                            :
                            (
                                <MainButton
                                    title="סיום"
                                    onPress={() => {
                                        this.saveAnswer(showQuestion.number, this.state.currentAnswer + 1);
                                        this.saveAnswerToMongoDb(showQuestion.number, this.state.currentAnswer + 1);

                                        this.props.navigation.navigate('System');
                                    }}
                                    width="65%" height="20%" height={this.state.buttonHeight} marginTop={this.state.ButtonTopMargin} />
                            )
                    }

                    {this.state.currentQuestion > 1 ?
                        <TouchableOpacity style={styles.previousTouchable} onPress={() => this.setState((prevState) => {
                            const newQuestionId = prevState.currentQuestion - 1;
                            const existsAnswer = prevState.answers.find((item) => item.questionNumber == newQuestionId)

                            return {
                                currentQuestion: newQuestionId,
                                currentAnswer: (!existsAnswer) ? null : existsAnswer.answerId - 1
                            };
                        })}
                        >
                            <Text style={styles.previousText}>לשאלה הקודמת</Text>
                        </TouchableOpacity>
                        :
                        null
                    }

                    <Modal
                        onRequestClose={this.onCloseDescription}
                        visible={this.state.descriptionModal} >
                        <View style={styles.outerStyle}>
                            <View style={styles.inner}>
                                <Text style={styles.modalText}>בחלון זה מוצגות שאלות לצורך חישוב רמת הסיכון של המערכת.</Text>
                                {this.props.route.params.questionType == 'damage' ?
                                    <Text style={styles.modalText}>השאלות בדף זה קשורות למערכת הנוכחית בלבד ולאחר סיום המענה, יבוצע חישוב רמת הנזק לצורך חישוב רמת הסיכון.</Text>
                                    :
                                    <Text style={styles.modalText}>השאלות בדף זה קשורות למערכת הנוכחית בלבד ולאחר סיום המענה, יבוצע חישוב רמת החשיפה לצורך חישוב רמת הסיכון.</Text>
                                }
                                <Text style={[{ marginTop: 10 }, styles.modalText]}>במידה ולמערכת מוגדרת רמת סיכון, מענה מחדש על השאלות עלול לעדכן אותה ולשנות את הבקרות בהתאם.</Text>
                                <TouchableOpacity onPress={this.onCloseDescription}>
                                    <Text style={styles.closeButton}>סגירה</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>

                </View >
            </ScrollView>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    loadinQuestions: {

        fontSize: 20,
        textAlign: 'center',
        marginBottom: '3%'
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
    },
    previousTouchable: {
        alignSelf: 'center',
        color: 'blue'
    },
    previousText:
    {
        color: '#169BD5'
    },
    outerStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    inner: {
        backgroundColor: 'white',
        paddingHorizontal: '5%',
        paddingVertical: '2%',
        width: '100%',
        borderColor: 'black',
        borderWidth: 1
    },
    modalText: {
        alignSelf: 'flex-start',
        fontSize: 16
    },

    closeButton: {
        color: '#169BD5',
        paddingTop: '3%'
    },
});

QuestionScreen.contextType = UserContext;
export default QuestionScreen;