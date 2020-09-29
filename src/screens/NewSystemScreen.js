import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import MainButton from '../components/MainButton';
import { saveSystem, getMaxRist } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';
import { Picker } from '@react-native-community/picker';
import CheckBox from '@react-native-community/checkbox';


class NewSystemScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systemName: '',
            materialName: '',
            maxRisk: '',
            risks: [],
            RiskLevelCheck: false,
            riskLevel: ''
        }
    }

    componentDidMount() {
        this.loadMaxRisk();
    }
//load the risk from the database
    loadMaxRisk = () => {
        getMaxRist().then(result => {
            if (!result) {
                return;
            }

            this.setState({
                risks: result

            });
        }).catch(error => {
            console.log('fail', error);
        });
    }
//save the data
    saveMySystem = () => {
        if (this.state.systemName == '' || this.state.materialName == '' || this.state.maxRisk == '') {
            Alert.alert('', 'יש למלא את כל השדות לצורך הוספת המערכת', [{ text: 'אישור' }])
        }
        else if (!['', '1', '2', '3', '4'].includes(this.state.riskLevel)) {
            Alert.alert('', 'רמת הסיכון שהוזנה שגויה', [{ text: 'אישור' }])
        }
        else {
            let status = "חישוב רמת סיכון";
            let RiskLevel = "בתהליך";
            if (!!this.state.riskLevel) {
                status = "ביצוע בקרות";
                RiskLevel = parseInt(this.state.riskLevel);
            }
            saveSystem(this.context.userId, this.state.systemName, this.state.materialName, this.state.maxRisk, status, RiskLevel).then(result => {
                if (!result) {
                    Alert.alert('הנתונים לא נשמרו', [{ text: 'אישור' }])
                    console.log('invalid usernumber / password');
                    return;
                }
                this.showSystemData(result.insertedId);
            })
        }
    }

    //get the systems' data
    showSystemData = (systemId) => {
        this.context.setSystemId(systemId);
        this.context.setSystemName( this.state.systemName);
        this.props.navigation.navigate('System')
    }


    //change the state of the checkbox
    setToggleCheckBox = () => {
        this.setState((prevState) => {
            return {
                RiskLevelCheck: !prevState.RiskLevelCheck
            }
        });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior={null} style={{ flex: 1, justifyContent: 'space-evenly' }}>
                <ScrollView style={styles.scrollViewContainer} contentContainerStyle={styles.container} >
                    <Text style={styles.textStyle}>שם המערכת</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ systemName: text })}
                        style={styles.input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="שם המערכת"
                    />
                    <Text style={styles.textStyle}>חומרים מסוכנים בשימוש המערכת</Text>
                    <TextInput
                        onChangeText={(text) => this.setState({ materialName: text })}
                        style={styles.textArea}
                        placeholder="רשימת החומרים"
                        numberOfLines={10}
                        multiline={true}
                    />
                    <Text style={styles.textStyle}>הסיכון המקסימלי שהמערכת מהווה</Text>
                    <View style={styles.dropDown}>
                        <Picker
                            selectedValue={this.state.maxRisk}
                            style={{ width: '100%', height: '100%' }}
                            onValueChange={(itemValue, itemIndex) => { this.setState({ maxRisk: itemValue }) }}
                        >
                            <Picker.Item key="none" label="יש לבחור סיכון" value="" />
                            {
                                this.state.risks.map((item) => {
                                    return (
                                        <Picker.Item
                                            key={item._id}
                                            label={item.risk}
                                            value={item.risk} />
                                    );
                                })
                            }
                        </Picker>
                    </View>
                    <View style={styles.checkbox}>
                        <CheckBox
                            value={this.state.RiskLevelCheck}
                            onValueChange={() => this.setToggleCheckBox()}
                        />
                        <Text >הזנת רמת הסיכון באופן ידני</Text>
                    </View >
                    {this.state.RiskLevelCheck &&
                        <TextInput style={styles.input}
                            onChangeText={(text) => this.setState({ riskLevel: text })}
                            placeholder="יש להזין את רמת הסיכון כאן"
                            multiline={true}
                        />
                    }
                    {/* </View > */}
                    <MainButton
                        title="הוספת המערכת"
                        onPress={this.saveMySystem}
                        width="65%" margin="20%"
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        // flex: 1,
        paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,

    },

    container: {
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        flexGrow: 1,
        flexShrink: 1,
        // justifyContent: 'space-evenly'
    },
    textStyle: {
        fontSize: 16,
        marginTop: '5%',
    },
    input: {
        borderColor: '#169BD5',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: 4,
        paddingHorizontal: 4,
        paddingVertical: 4,
        fontSize: 15,
        marginBottom: 4
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
    dropDown: {
        width: '100%',
        borderRadius: 10,
        fontSize: 17,
        borderWidth: 3,
        borderColor: '#169BD5',
        justifyContent: 'center',
        textAlign: 'center',
        height: 40,
        marginTop: 5,
    },
    checkbox: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    }
});
NewSystemScreen.contextType = UserContext;
export default NewSystemScreen;