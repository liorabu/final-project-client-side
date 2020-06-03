import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';
import { getDashboardData } from '../utils/MongoDbUtils';
import { UserContext } from '../contexts/UserContext';
import Option from '../components/Option';

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      systems: [],
      doneSystems: [],
      performedControls: [],
      userControls:0
    }
  }

  componentDidMount() {
    this.loadSashboardData();  
  }

  loadSashboardData = () => {
    getDashboardData(this.context.userId).then(result => {
      if (!result) {
        return;
      }
      this.setState({
        systems: result.userSystems,
        doneSystems: result.doneSystems,
        performedControls: result.performedControls,
        userControls:result.userControls
      });
    }).catch(error => {
      console.log('fail', error);
    });
  }


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Option text='מערכות שהוזנו' onPress={() => { this.props.navigation.navigate('Systems') }} />
          <Option text='הזנת מערכת' onPress={() => { this.props.navigation.navigate('NewSystem') }} />
          <Option text='פרטים אישיים' onPress={() => { this.props.navigation.navigate('UserDetails') }} />
          <Option text='צור קשר' />
        </View>

        <View style={styles.dashboard}>
          {this.state.systems.length > -1 && this.state.doneSystems.length > -1 && this.state.performedControls.length > -1 &&
            <>
              <Text style={styles.dashboardText}>מערכות שהוזנו: {this.state.systems.length}</Text>
             
              <Text style={styles.dashboardText}>בקרות כוללות לביצוע: {this.state.userControls}</Text>
              <Text style={styles.dashboardText}>בקרות שהושלמו: {this.state.performedControls.length}</Text>
              <Text style={styles.dashboardText}>מערכות בסטטוס סיום: {this.state.doneSystems.length}</Text>
            </>
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly'
  },
  dashboard: {
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#D3D3D3',
    paddingHorizontal: '2%',
    paddingVertical: '3%'
  },
  dashboardText: {
    fontSize: 16,
    marginBottom: '1%'
  }

});
HomeScreen.contextType = UserContext;
export default HomeScreen;