import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, Image, TextInput } from 'react-native';
import MainButton from '../components/MainButton';

export default LoginScreen = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/cyber_logo.jpg')} />
            <View style={styles.dataContainer}>
                <Text style={styles.textStyle}>מספר ארגון</Text>
                <TextInput
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Text style={styles.textStyle}>סיסמה</Text>
                <TextInput
                    style={styles.input}
                    secureTextEntry={true}
                    returnKeyType='go'
                    autoCapitalize="none"
                    autoCorrect={false}
                />

            </View>
            <MainButton title="התחבר" />
            <Image style={styles.image} source={require('../assets/logo.png')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: 20,

    },
    image: {
        alignSelf:'center',
        marginVertical:'2%'
    },
    dataContainer:{
        marginVertical:15,
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
})