import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, TextInput } from 'react-native';
import Option from '../components/Option';
import SystemDetails from '../components/SystemDetails';
import { getSystem, loadClient, getMaxRist, updateSystemData } from '../utils/MongoDbUtils';
import { Modal } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { UserContext } from '../contexts/UserContext';

class SystemScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            system: '',
            showModal: false,
            materials: '',
            risks: [],
            maxRisk: '',
            name: ''
        }
        const unsubscribeFocus = null;
    }
    componentDidMount() {
        this.loadThisSystem();
        this.unsubscribeFocus = this.props.navigation.addListener('focus', this.onScreenFocus);
        this.loadMaxRisk();
    }
    componentWillUnmount() {
        if (this.unsubscribeFocus) {
            this.unsubscribeFocus();
        }
    }
    onScreenFocus = () => {
        this.loadThisSystem();
    }

    //load the optional risks 
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

    //show the update modal
    onShowModalClick = () => {
        this.setState({
            showModal: true,
        });
    }

    //hide the update modal
    onCloseModalClick = () => {
        this.setState({
            showModal: false,
        });
    }

    //update system's data
    onCloseAndUpdateClick = () => {
        updateSystemData(this.context.systemId, this.state.name, this.state.materials, this.state.maxRisk).then(result => {
            if (!result) {
                return;
            }

            this.loadThisSystem();
            this.setState({

                showModal: false

            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    //load the system's data
    loadThisSystem = () => {
        getSystem(this.context.systemId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                system: result,
                materials: result.materials,
                maxRisk: result.maxRisk,
                name: result.name

            });
        }).catch(error => {
            console.log('fail', error);
        });
    }
    render() {
        return (
                <View style={styles.container} >
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{this.state.system.name}</Text>
                    </View>
                    <Text style={styles.descriptionStyle}>מצב המערכת</Text>
                    <View style={styles.dataContainer}>
                        <View style={styles.dataRow}>
                            <View style={styles.detailsRow}>
                                <Text style={[styles.dataText, { fontWeight: 'bold' }]}>רמת סיכון</Text>
                                <Text style={[styles.dataText, { fontWeight: 'bold' }]}>סטטוס עבודה</Text>
                            </View>
                            <View style={styles.detailsRow}>
                                <Text style={[styles.dataText, { width: '50%', textAlign: 'left' }]}>{this.state.system.riskLevel}</Text>
                                <Text style={styles.dataText} >{this.state.system.status}</Text>
                            </View>
                        </View >
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.descriptionStyle}>מאפייני המערכת </Text>
                        <TouchableOpacity onPress={() => { this.onShowModalClick() }}><Text style={styles.edit}>עריכה</Text></TouchableOpacity>
                    </View>
                    <View style={styles.dataContainer}>
                        <View style={styles.dataRow}>
                            <View style={styles.detailsRow}>
                                <Text style={[styles.dataText, { width: '50%', fontWeight: 'bold' }]}>חומ"ס בשימוש</Text>
                                <Text style={[styles.dataText, { fontWeight: 'bold' }]}>סיכון מקסימלי</Text>
                            </View>
                            <View style={styles.detailsRow}>
                                <Text style={[styles.dataText, { width: '50%', textAlign: 'left' }]}>{this.state.system.materials}</Text>
                                <Text style={[styles.dataText, { alignSelf: 'flex-end' }]}>{this.state.system.maxRisk}</Text>

                            </View>
                        </View>
                    </View>


                    <Option text='שאלות רמת חשיפה' onPress={() => { this.props.navigation.navigate('Question', { questionType: 'exposure' }) }} />
                    <Option text='שאלות רמת נזק' onPress={() => { this.props.navigation.navigate('Question', { questionType: 'damage' }) }} />
                    {      this.state.system.riskLevel == "בתהליך" ?
                    <Option text='בקרות' disable='true' />
                    :
                    <Option text='בקרות' onPress={() => { this.props.navigation.navigate('Control', { riskLevel: this.state.system.riskLevel }) }} />
                    }


                    <Modal
                        onRequestClose={this.onCloseModalClick}
                        visible={this.state.showModal}>
                        <View style={styles.outerStyle}>
                            <View style={styles.inner}>
                                <Text style={styles.modalHeaders}>שם המערכת</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({ name: text })}
                                    style={styles.textArea}
                                    value={this.state.name}
                                />
                                <Text style={styles.modalHeaders}>חומ"ס בשימוש</Text>
                                <TextInput
                                    onChangeText={(text) => this.setState({ materials: text })}
                                    style={styles.textArea}
                                    numberOfLines={5}
                                    multiline={true}
                                    value={this.state.materials}
                                />
                                <Text style={styles.modalHeaders}>סיכון עיקרי</Text>
                                <View style={styles.dropDown}>
                                    <Picker
                                        selectedValue={this.state.maxRisk}
                                        style={{ width: '100%', height: '100%' }}
                                        onValueChange={(itemValue, itemIndex) => { this.setState({ maxRisk: itemValue }) }}
                                    >
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

                                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                    <TouchableOpacity onPress={this.onCloseAndUpdateClick}>
                                        <Text style={styles.closeButton}>אישור</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onCloseModalClick}>
                                        <Text style={styles.closeButton}>סגירה</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    dataContainer: {
        // flex: 1,
        paddingBottom: '4%',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: '6%',
    },
    descriptionStyle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 7
    },
    edit: {
        fontSize: 15,
        color: '#169BD5',
        marginBottom: 7
    },
    title: {
        width: '100%',
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: '5%',
    },
    dataContainer: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: '#d6d6d6',
        borderBottomColor: '#d6d6d6',
        marginBottom: '5%',
    },
    dataRow: {
        alignItems: 'stretch',
        paddingHorizontal: '2%',
        paddingVertical: '2%',
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    dataText: {
        fontSize: 13,
        marginVertical: '0.5%',
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
    closeButton: {
        color: '#169BD5',
        paddingTop: '3%'
    },

    moreInfoItemTitle: {
        fontWeight: 'bold',
        paddingTop: '3%'
    },
    modalLinks: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 3
    },
    modalHeaders: {
        marginVertical: 5,
        fontWeight: 'bold'
    },
    modalText: {
        alignSelf: 'flex-start',
        fontSize: 16
    },
    textArea: {
        // borderColor: '#169BD5',
        borderWidth: 2,
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
        borderWidth: 2,
        borderColor: '#000000',
        justifyContent: 'center',
        textAlign: 'center',
        height: 40,
        marginTop: 5,
    },
});



SystemScreen.contextType = UserContext;

export default SystemScreen;