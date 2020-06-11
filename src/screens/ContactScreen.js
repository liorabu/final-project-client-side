import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import MainButton from '../components/MainButton';
import { saveSystem, getMaxRist } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';
import CheckBox from '@react-native-community/checkbox';

class ContactScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messageBody: '',
            statementCheckbok: false,
            confirmCheckbox: false
        }
    }
    setStatementCheckBox = () => {
        this.setState((prevState) => {
            return {
                statementCheckbok: !prevState.statementCheckbok
            }
        });
    }
    setConfirmCheckBox = () => {
        this.setState((prevState) => {
            return {
                confirmCheckbox: !prevState.confirmCheckbox
            }
        });
    }
    render() {
        return (
            <View style={styles.messageView}>
                <Text style={styles.messageText}>יש ליצור קשר עם דוד ויסמן</Text>
                <Text style={styles.messageText}>DavidV@sviva.gov.il‏</Text>
            </View>
        )
    }
    // render() {
    //     return (
    //         <KeyboardAvoidingView behavior={null} style={{ flex: 1, justifyContent: 'space-evenly' }}>
    //             <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container} >
    //                 <View>
    //                     <Text style={styles.textStyle}>נושא הפניה</Text>
    //                     <TextInput style={styles.textArea}
    //                         onChangeText={(text) => this.setState({ messageBody: text })}
    //                         placeholder="יש לכתוב את גוף ההודעה כאן"
    //                         multiline={true}
    //                     />
    //                 </View>
    //                 <View style={styles.checkbox}>
    //                     <CheckBox
    //                         value={this.state.statementCheckbok}
    //                         onValueChange={() => this.setStatementCheckBox()}
    //                     />
    //                     <Text >להגשת הצהרת סיום התהליך</Text>
    //                 </View>
    //                 {this.state.statementCheckbok &&
    //                     <View style={{marginBottom:'10%'}}>
    //                         <View style={[styles.checkbox], { paddingStart: '5%', flexDirection: 'row', marginBottom: '5%' }}>
    //                             <CheckBox
    //                                 value={this.state.confirmCheckbox}
    //                                 onValueChange={() => this.setConfirmCheckBox()}
    //                             />
    //                             <View style={{ flex: 1 }}>
    //                                 <Text >אני מצהיר/ה כי הפרטים שמסרתי בטפסים הינם מלאים ונכונים.</Text>
    //                                 <Text>ידוע לי שהשמטה או מסירת פרטים לא נכונים הינה עבירה על החוק.</Text>
    //                                 <Text>אני מתחייב/ת להודיע למשרד להגנת הסביבה על כל שינוי שיחול בפרטים דלעיל תוך שבוע ימים מתאריך השינוי</Text>

    //                             </View>

    //                         </View>
    //                         <View>
    //                         <MainButton
    //                             title="העלאת קובץ ההצהרה"
    //                             width="65%" height="100%" />
    //                             </View>
    //                     </View>

    //                 }
    //                 <View style={{ marginTop: '5%' }}>
    //                     <MainButton
    //                         title="שליחת ההודעה"
    //                         width="65%"  height="100%"/>
    //                 </View>
    //             </ScrollView>
    //         </KeyboardAvoidingView>
    //     )
    // }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,

    },

    container: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        // flexGrow: 1,
        // flexShrink: 1,
    },
    textStyle: {
        fontSize: 16,
        marginTop: '5%',
        fontWeight: 'bold'
    },
    textArea: {
        borderColor: '#169BD5',
        borderWidth: 3,
        borderRadius: 10,
        height: 150,
        justifyContent: "flex-start",
        marginTop: '2%',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
    },
    checkbox: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageView:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    messageText:{
        fontSize: 20,
        textAlign: 'center',
        marginBottom: '3%',
        fontWeight:'bold'
    }
})

ContactScreen.contextType = UserContext;
export default ContactScreen;
