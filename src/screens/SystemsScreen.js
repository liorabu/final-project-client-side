import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList } from 'react-native';
import { BaseRouter } from '@react-navigation/native';

export default SystemsScreen = ({navigation}) => {
    const Systems = [
        { id: '1', name: 'מערכת 1', status: 'חישוב רמת סיכון', LevelOfRisk: 'בתהליך', MaxRisk: 'סיכון 1' },
        { id: '2', name: 'מערכת 2', status: 'ביצוע בקרות', LevelOfRisk: 3, MaxRisk: 'סיכון 2' },
        { id: '3', name: 'מערכת 3', status: 'חישוב רמת סיכון', LevelOfRisk: 'בתהליך', MaxRisk: 'סיכון 4' },
        { id: '4', name: 'מערכת 4', status: 'סיום', LevelOfRisk: 1, MaxRisk: 'סיכון 1' },
        { id: '5', name: 'מערכת 5', status: 'סיום', LevelOfRisk: 1, MaxRisk: 'סיכון 1' },
        { id: '6', name: 'מערכת 6', status: 'סיום', LevelOfRisk: 1, MaxRisk: 'סיכון 1' },
        { id: '7', name: 'מערכת 7', status: 'חישוב רמת סיכון', LevelOfRisk: 'בתהליך', MaxRisk: 'סיכון 4' },
        { id: '8', name: 'מערכת 8', status: 'סיום', LevelOfRisk: 1, MaxRisk: 'סיכון 1' },
        { id: '9', name: 'מערכת 9', status: 'סיום', LevelOfRisk: 1, MaxRisk: 'סיכון 1' },
    ];
    return (
        <FlatList style={styles.container}
            // numColumns={3}
            showsHorizontalScrollIndicator={true}
            // keyExtractor={(System) => System.id}
            data={Systems}
            renderItem={({ item }) => {
                return (

                    <TouchableOpacity style={styles.systemContainer} onPress={()=>{navigation.navigate('System',{item})}}>
                        <Text style={styles.systemName} >
                            שם המערכת: {item.name}
                        </Text>
                        <Text >סטטוס: {item.status}</Text>
                    </TouchableOpacity>
                );
            }}
        />
    )
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

