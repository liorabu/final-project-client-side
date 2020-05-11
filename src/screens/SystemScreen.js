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

    // const { route } = props;
    // const system=route.params.item;
    // const title=route.params.item.name;
    render() {
        return (

            <View style={styles.container} >
                <SystemDetails system={this.state.system} />

                <Option text='חישוב רמת חשיפה' onPress={() => { this.props.navigation.navigate('Question', { questionType: 'exposure' }) }} />
                <Option text='חישוב רמת סיכון' onPress={() => { this.props.navigation.navigate('Question', { questionType: 'damage' }) }} />
                {/* <Option text='בקרות' onPress={() => { props.navigation.navigate('Control') }} />  */}
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