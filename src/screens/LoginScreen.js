import React, { useState } from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, Image, TextInput, AsyncStorage ,Alert,KeyboardAvoidingView,ScrollView } from 'react-native';
import MainButton from '../components/MainButton';
import { login, loadClient } from '../utils/MongoDbUtils';
import {UserContext} from '../contexts/UserContext';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
        }
    }

    handleLoginClick = () => {
        if (this.state.username == '' || this.state.password == '') {
            Alert.alert('', 'יש להכניס מספר ארגון וסיסמה',[{text: 'אישור'}])
        }
        else {
            login(this.state.username, this.state.password)
                .then(result => {
                    if (!result) {
                        Alert.alert('', 'הנתונים שהוזנו לא תואמים את המידע שברשותנו',[{text: 'אישור'}])
                        console.log('invalid usernumber / password');
                        return;
                    }

                    console.log('login success', result);
                    this.context.setUserNumber(result._id);
                    this.props.navigation.navigate('Home');
                })
                .catch(error => {
                    console.log('login failed', error);
                });
        }
      
    }

    render() {
        // const { showAlert } = this.state;
        return (
            <View style={styles.container} >
                <Image style={styles.image} source={require('../assets/cyber_logo.jpg')} />
                <View style={styles.dataContainer}>
                    <Text style={styles.textStyle}>מספר ארגון</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ username: text })}
                        value={this.state.username}
                        placeholder='מספר ארגון'
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <Text style={styles.textStyle}>סיסמה</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ password: text })}
                        value={this.state.password}
                        placeholder='סיסמה'
                        style={styles.input}
                        secureTextEntry={true}
                        returnKeyType='go'
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <MainButton title="התחבר" onPress={this.handleLoginClick} />
                <Image style={styles.image} source={require('../assets/logo.png')} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,
        justifyContent:'center',

    },
    image: {
        alignSelf: 'center',
        marginVertical: '2%',
    },
    dataContainer: {
        marginVertical: 15,
    },
    textStyle: {
        fontSize: 18,
    },
    input: {
        borderColor: '#797979',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: '2%',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        fontSize: 15,
        marginBottom: '2%'
    },
    header:{
        backgroundColor:'red'
    },
    keyboardViewContainer: {
        width: '100%', 
        alignItems: 'center'
      },
})

LoginScreen.contextType = UserContext;

export default LoginScreen;