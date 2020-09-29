import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, TextInput, ScrollView, KeyboardAvoidingView, Platform, StatusBar ,Alert} from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getUserDetails, saveUserData } from '../utils/MongoDbUtils';
import MainButton from '../components/MainButton';
import DateTimePicker from '@react-native-community/datetimepicker';




class UserDetailsScreen extends React.Component {

    YEARS_FOR_QUESTIONS = 1;
    YEARS_FOR_CONTROLS = 3;

    constructor(props) {
        super(props);
        let dateToday;
        this.state = {
            beginningDate: null,
            contactEmail: null,
            contactPerson: null,
            contactPhone: null,
            name: null,
            wasLoaded: false,
            showDatePicker: false
        }
    }

    componentDidMount() {
        this.loadUserData();

    }
//load the data of the yser
    loadUserData = () => {
        getUserDetails(this.context.userId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                beginningDate: result.beginningDate,
                contactEmail: result.contactEmail,
                contactPerson: result.contactPerson,
                contactPhone: result.contactPhone,
                name: result.name,
                wasLoaded: true
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }
//save / update the data
    saveMyData = () => {
        if (this.state.beginningDate=='' || this.state.contactEmail==''|| this.state.contactPerson==''|| this.state.contactPhone==' ' ) {
                console.log("y",this.state.contactPhone ,"g")
            Alert.alert('', 'יש למלא את כל הנתונים', [{ text: 'אישור' }]);
            return;
        }
        else {
            saveUserData(this.context.userId, this.state.beginningDate, this.state.contactEmail,
                this.state.contactPerson, this.state.contactPhone).then(result => {
                    if (!result) {
                        Alert.alert('', 'חלה שגיאה בשמירת הנתונים, אנא נסה שוב', [{ text: 'אישור' }])
                    }
                    else {
                        this.props.navigation.navigate('Home');
                    }
                }).catch(error => {
                    console.log('fail', error);
                });
        }
    }

    //calulate dates 
    getFutureDate = (date, moreYears) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear() + moreYears;
        return `${day}/${month}/${year}`;
    }

    formatDate = (date) => {
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    render() {
        if (!this.state.wasLoaded) {
            return (
                <View style={styles.loadContainer} >
                    <Text style={styles.loadDetails}>הנתונים נטענים,</Text>
                    <Text style={styles.loadDetails}>אנא המתן</Text>
                </View>
            )
        }

        return (
            <KeyboardAvoidingView behavior={null} style={{ flex: 1, justifyContent: 'space-evenly' }}>
                <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container} >
                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>שם המפעל</Text >
                        <Text style={styles.dataStyle}>{this.state.name}</Text>
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>איש קשר</Text >
                        <TextInput style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ contactPerson:text})}
                            returnKeyType='go'
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.contactPerson}
                        />
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>טלפון ליצירת קשר</Text >
                        <TextInput style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ contactPhone:text})}
                            returnKeyType='go'
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.contactPhone}
                        />
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>מייל ליצירת קשר</Text >
                        <TextInput style={styles.inputStyle}
                            onChangeText={(text) => this.setState({ contactEmail: text })}
                            returnKeyType='go'
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.contactEmail}
                        />
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>תאריך תחילת התהליך</Text >
                        <TouchableOpacity style={styles.inputStyle} onPress={() => this.setState({ showDatePicker: true })}>
                            <Text style={{ textAlign: 'left' }}>{this.formatDate(this.state.beginningDate)}</Text>
                        </TouchableOpacity>
                        {!!this.state.showDatePicker &&
                            <DateTimePicker
                                value={this.state.beginningDate}
                                mode="date"
                                display="default"
                                onChange={(event, selectedDate) => {
                                    if (selectedDate) {
                                        this.setState({
                                            beginningDate: selectedDate,
                                            showDatePicker: false
                                        })
                                    }
                                }}
                            />
                        }
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>תאריך סיום שלב ראשוני</Text >
                        <Text style={styles.dataStyle}>{this.getFutureDate(this.state.beginningDate, this.YEARS_FOR_QUESTIONS)}</Text>
                    </View>

                    <View style={styles.dataGroup}>
                        <Text style={styles.title}>תאריך סיום ביצוע הבקרות</Text >
                        <Text style={styles.dataStyle}>{this.getFutureDate(this.state.beginningDate, this.YEARS_FOR_CONTROLS)}</Text>
                    </View>
                        <MainButton
                            title="עדכון פרטים"
                            onPress={this.saveMyData}
                            width="65%"
                        />
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    scrollViewContainer: {
        // flex: 1,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,

    },

    container: {
        justifyContent: 'space-between',
        // flex:1
        paddingHorizontal: 20,
        flexGrow: 1,
        flexShrink: 1,
        // justifyContent: 'space-evenly'
    },
    titleStyle: {
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    dataGroup: {
        width: '100%'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,

    },
    dataStyle: {
        marginTop: 5,
        fontSize: 16,
        textAlign: 'left'
    },
    inputStyle: {
        borderColor: '#169BD5',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 15,
        textAlign: 'right'
    },
    loadContainer: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center'
    },
    loadDetails: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 10,
        color: "#757575"

    },
})


UserDetailsScreen.contextType = UserContext;

export default UserDetailsScreen;