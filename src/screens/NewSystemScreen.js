import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import MainButton from '../components/MainButton';
import { Dropdown } from 'react-native-material-dropdown';
import { saveSystem, getMaxRist } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext'

class NewSystemScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            systemName: '',
            materialName: '',
            maxRisk: '',
            risks: [],
        }
    }

    componentDidMount() {

        this.loadMaxRisk();
    }

    loadMaxRisk = () => {
        getMaxRist().then(result => {
            if (!result) {

                // console.log('there are no systems');
                return;
            }

            this.setState({
                risks: result

            });
        }).catch(error => {
            // console.log('fail', error);
        });
    }

    saveMySystem = () => {
        if (this.state.systemName == '' || this.state.materialName == '' || this.state.maxRisk == '') {
            Alert.alert('', 'יש למלא את כל השדות לצורך הוספת המערכת', [{ text: 'אישור' }])
        }
        else {
            let status = "חישוב רמת סיכון";
            let RiskLevel = "בתהליך";
            saveSystem(this.context.userId, this.state.systemName, this.state.materialName, this.state.maxRisk, status, RiskLevel).then(result => {


                if (!result) {
                    Alert.alert('הנתונים לא נשמרו', [{ text: 'אישור' }])
                    console.log('invalid usernumber / password');
                    return;
                }
                this.props.navigation.navigate('Systems');
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle}>שם המערכת</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ systemName: text })}
                    style={styles.input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    placeholder="מערכת כלשהי"
                />
                <Text style={styles.textStyle}>חומרים מסוכנים בשימוש המערכת</Text>
                <TextInput
                    onChangeText={(text) => this.setState({ materialName: text })}
                    style={styles.textArea}
                    placeholder="חומר כלשהו"
                    numberOfLines={10}
                    multiline={true}
                />
                <Dropdown
                    onChangeText={(text) => this.setState({ maxRisk: text })}
                    style={styles.dropDown}
                    label="סיכון מקסימלי"
                    data={this.state.risks}
                    valueExtractor={(item) => item.risk}
                    lineWidth={0}
                    activeLineWidth={0}
                    disabledLineWidth={0}
                />
                <MainButton
                    title="הוספה לרשימת המערכות"
                    onPress={this.saveMySystem}
                    width="65%" margin="20%"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: '2%'

    },
    textStyle: {
        fontSize: 18,
        marginTop: '5%',
    },
    input: {
        borderColor: '#169BD5',
        borderWidth: 3,
        borderRadius: 10,
        marginTop: '2%',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        fontSize: 15,
        marginBottom: '2%'
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
        borderWidth: 1,
        borderColor: '#169BD5',
        textAlign: 'center',
        height: 40
    },
});
NewSystemScreen.contextType = UserContext;
export default NewSystemScreen;