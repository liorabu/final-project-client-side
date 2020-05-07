import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, Alert } from 'react-native';
import { BaseRouter } from '@react-navigation/native';
import { getSystems, loadClient } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext'



class SystemsScreen extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            systems: [],
            isLoading: false
        }
    }

    componentDidMount() {

        this.loadMySystems();
    }

    loadMySystems = () => {
        // console.log(this.context.userNumber)
        getSystems(this.context.userNumber).then(result => {
            if (!result) {

                // console.log('there are no systems');
                return;
            }
            this.setState({
                systems: result      
            });
        }).catch(error => {
            console.log('fail', error);
        });
    }

    render() {
        // console.log(this.state.systems)
        // this.context.setUserNumber(123);

        return (

            <View>
                 <FlatList 
                    showsHorizontalScrollIndicator={true}
                    data={this.state.systems}
                    renderItem={({ item }) => {
                       console.log(item)
                        return (
                            // <TouchableOpacity style={styles.systemContainer} onPress={() => { navigation.navigate('System', { item }) }}>
                          <TouchableOpacity style={styles.systemContainer}>
                                <Text style={styles.systemName} >
                                    שם המערכת: {item.name}
                                </Text>
                                <Text >סטטוס: {item.status}</Text>
                             </TouchableOpacity>
                        );
                    }}
                /> 
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '1%',


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
    // systemName: {
    //     fontSize: 16,
    //     fontWeight: 'bold',
    //     marginTop: 0
    // },
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