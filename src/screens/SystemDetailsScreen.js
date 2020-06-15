import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

export default SystemDetailScreen = (props) => {
    const { route } = props;
    const system = route.params.system;
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{system.name}</Text>
            </View>
                <View style={styles.dataContainer}>
                    <View style={styles.detailsRow}>
                        <Text style={[styles.dataText, { fontWeight: 'bold' }]}>רמת סיכון</Text>
                        <Text style={[styles.dataText, { fontWeight: 'bold' }]}>סטטוס עבודה</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.dataText}>{system.LevelOfRisk}</Text>
                        <Text style={styles.dataText} >{system.status}</Text>
                    </View>
                </View >
                <View style={styles.dataContainer}>
                    <View style={styles.detailsRow}>
                        <Text style={[styles.dataText, { fontWeight: 'bold' }]}>חומ"ס בשימוש</Text>
                        <Text style={[styles.dataText, { fontWeight: 'bold' }]}>סיכון מקסימלי</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.dataText}>רשימת חומרים</Text>
                        <Text style={styles.dataText}>{system.MaxRisk}</Text>
                    </View>
                </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '4%',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: '6%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    dataContainer: {
        alignItems: 'stretch',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        paddingHorizontal: '2%',
        paddingVertical: '2%',
        borderTopColor: '#d6d6d6',
        borderBottomColor: '#d6d6d6',
marginTop:'6%'
    },
    detailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'red'
    },
    dataText: {
        // fontSize: 40,
        marginVertical: '0.5%',
        backgroundColor:'red',
        color:'yellow'
    }

});