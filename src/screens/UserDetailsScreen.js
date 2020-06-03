import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { UserContext } from '../contexts/UserContext';
import { getUserDetails,saveUserData } from '../utils/MongoDbUtils';
import DatePicker from 'react-native-datepicker';
import MainButton from '../components/MainButton';




class UserDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        let dateToday;
        this.state = {
            beginningDate: null,
            contactEmail: null,
            contactPerson: null,
            contactPhone: null,
            name: null,
        }
    }

    componentDidMount() {
        this.loadUserData();
        this.loadDateToday();
    }

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
                name: result.name
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    saveMyData = () => {
        if (this.state.beginningDate == '' || this.state.beginningDate == '' || this.state.contactEmail == '' ||
            this.state.contactPerson == '' || this.state.contactPhone == '') {
            Alert.alert('', 'יש למלא את כל הנתונים', [{ text: 'אישור' }])
        }
        else {
            saveUserData(this.context.userId, this.state.beginningDate, this.state.contactEmail,
                this.state.contactPerson, this.state.contactPhone).then(result => {
                    if (!result) {
                        Alert.alert('', 'חלה שגיאה בשמירת הנתונים, אנא נסה שוב', [{ text: 'אישור' }])
                    }
                    else{
                        this.props.navigation.navigate('Home');
                    }     
                }).catch(error => {
                    console.log('fail', error);
                });
            }
    }

    loadDateToday = () => {
        let day = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        this.dateToday = year + "-" + month + "-" + day;
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.titleStyle}>פרטים אישיים</Text>
                <View style={styles.dataGroup}>
                    <Text style={styles.title}>שם המפעל</Text >
                    <Text style={styles.dataStyle}>{this.state.name}</Text>
                </View>

                <View style={styles.dataGroup}>
                    <Text style={styles.title}>איש קשר</Text >
                    <TextInput style={styles.inputStyle}
                        onChangeText={(text) => this.setState({ contactPerson: text })}
                        returnKeyType='go'
                        autoCapitalize="none"
                        autoCorrect={false}
                        value={this.state.contactPerson}
                    />
                </View>

                <View style={styles.dataGroup}>
                    <Text style={styles.title}>טלפון ליצירת קשר</Text >
                    <TextInput style={styles.inputStyle}
                        onChangeText={(text) => this.setState({ contactPhone: text })}
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
                    <DatePicker
                        style={{ width: 200 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="DD/MM/YYYY"
                        // minDate="2016-05-01"
                        // maxDate="2020-06-03"
                        // maxDate={this.dateToday}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        value={this.state.beginningDate}
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ beginningDate: date }) }}
                    />
                </View>

                <MainButton
                    title="עדכון פרטים"
                    onPress={this.saveMyData}
                    width="65%" margin="20%" height="8%"
                />


            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly',
        alignItems: 'flex-start',
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

        // paddingHorizontal: 10,
        // paddingVertical:5,
    },
    inputStyle: {
        borderColor: '#169BD5',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 15,
        // marginBottom: '2%'
        textAlign: 'right'
    }
})


UserDetailsScreen.contextType = UserContext;

export default UserDetailsScreen;