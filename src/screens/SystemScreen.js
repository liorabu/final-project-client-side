import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList } from 'react-native';
import Option from '../components/Option';
import SystemDetails from '../components/SystemDetails';
import { getSystem, loadClient } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext'


class SystemScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            system: '',
        }
    }
    componentDidMount() {

        this.loadThisSystem();
    }


    loadThisSystem = () => {
        getSystem(this.context.systemId).then(result => {
            if (!result) {
                return;
            }
            this.setState({
                system: result

            });
        }).catch(error => {
            console.log('fail', error);
        });
    }
    render() {
        return (
            this.state.system.riskLevel == "בתהליך" ?
                <View style={styles.container} >
                    <SystemDetails system={this.state.system} />
                    <Option text='שאלות רמת חשיפה' onPress={() => { this.props.navigation.navigate('Question', { questionType: 'exposure' }) }} />
                    <Option text='שאלות רמת נזק' onPress={() => { this.props.navigation.navigate('Question', { questionType: 'damage' }) }} />
                    <Option text='בקרות'  disable='true'/>
                </View>
                :
                <View style={styles.container} >
                    <SystemDetails system={this.state.system} />
                    <Option text='שאלות רמת חשיפה' onPress={() => { this.props.navigation.navigate('Question', { questionType: 'exposure' }) }} />
                    <Option text='שאלות רמת נזק' onPress={() => { this.props.navigation.navigate('Question', { questionType: 'damage' }) }} />
                    <Option text='בקרות' onPress={() => { this.props.navigation.navigate('Control', { riskLevel: this.state.system.riskLevel }) }} />

                </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },


});

SystemScreen.contextType = UserContext;

export default SystemScreen;