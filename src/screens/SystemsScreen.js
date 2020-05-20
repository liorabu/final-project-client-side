import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, ScrollView, Alert } from 'react-native';
import { BaseRouter } from '@react-navigation/native';
import { getSystems, deleteSystem, loadClient } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext'



class SystemsScreen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            systems: [],
            isLoading: false
        }

        const unsubscribeFocus = null;
    }

    componentDidMount() {
        this.loadMySystems();
        this.unsubscribeFocus = this.props.navigation.addListener('focus', this.onScreenFocus);
    }

    componentWillUnmount(){
        if(this.unsubscribeFocus){
            this.unsubscribeFocus();
        }
    }

    onScreenFocus = () => {
        this.loadMySystems();
    }

    loadMySystems = () => {
        getSystems(this.context.userId).then(result => {
            if (!result) {
                return;
            }
            if(result.length>0){
                this.state.isLoading=true
            }
            this.setState({
                systems: result,
            });
        }).catch(error => {
            console.log('fail', error);
        });
       
    }

    getSystemData = (system) => {
        this.context.setSystemId(system._id);
        this.props.navigation.navigate('System')
    }

    DeleteAlert = (systemId) => {
        Alert.alert('', 'האם אתה בטוח שברצונך למחוק את המערכת?', [{ text: 'אישור', onPress: () => { this.delete(systemId) } }, { text: 'ביטול', onPress: () => console.log("save") }])
    }

    delete = (systemId) => {
        deleteSystem(systemId).then(result => {
            if (!result) {
                return;
            }

            this.setState((prevState) => {
                const systemIndex = prevState.systems.findIndex((item) => item._id == systemId);
                const newSystems = [ ...prevState.systems ];
                newSystems.splice(systemIndex, 1);

                return {
                    systems: newSystems
                }
            });
        }).catch(error => {
            console.log('fail', error);
        });

    }

    backgroundBytage=(system)=>{
        if(system.status=="חישוב רמת סיכון"){
            return "#d7dbdd"
        }
        else if(system.status=="ביצוע בקרות"){
            return "#FFDDEE"
        }
        else if(system.status=="סיום"){
            return "#f9ebea"
        }

       
    }

    render() {
        if (!this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <Text style={styles.loadingText}>לא הוזנו מערכות ממוחשבות</Text>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('NewSystem') }}>
                        <Text style={styles.loadingLink}>להוספת מערכת חדשה</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else {
            return (
                <ScrollView>
                    <View>
                        {
                            this.state.systems.map((item) => {
                                return (<TouchableOpacity style={[styles.systemContainer,{backgroundColor:this.backgroundBytage(item)}]} key={item._id} onPress={() => { this.getSystemData(item) }}
                                    onLongPress={() => { this.DeleteAlert(item._id) }}>
                                    <Text style={styles.systemName} >
                                        שם המערכת: {item.name}
                                    </Text>
                                    <Text >סטטוס: {item.status}</Text>
                                </TouchableOpacity>
                                )
                            })
                        }
                        <TouchableOpacity style={styles.NewSystemTouchable} onPress={() => { this.props.navigation.navigate('NewSystem') }}>
                            <Text style={styles.NewSystemText}>הזנת מערכת נוספת</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize: 23
    },
    loadingLink: {
        fontSize: 19,
        color: '#acacac',
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        paddingHorizontal: '1%',
    },
    NewSystemTouchable: {
        paddingStart: 10,
        paddingVertical: '2%'
    },
    NewSystemText: {
        fontSize: 20,
        color: '#169BD5',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    FlatStyle: {
        marginTop: '2%'
    },
    systemContainer: {
        borderColor: '#169BD5',
        borderWidth: 3,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        marginVertical: '1%',
        marginHorizontal: '1%'

    },
    systemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 0
    },
    systemDetails: {
        fontSize: 14,
        marginVertical: 3
    },
    secondRaw: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


SystemsScreen.contextType = UserContext;

export default SystemsScreen;