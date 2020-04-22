import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity } from 'react-native';

export default SystemDetail = ({ system }) => {
    // const { route } = props;
    // const system = route.params.system;
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{system.name}</Text>
            </View>
            <View style={styles.dataContainer}>


                <View style={styles.dataRow}>
                    <View style={styles.detailsRow}>
                        <Text style={[styles.dataText, { fontWeight: 'bold' }]}>רמת סיכון</Text>
                        <Text style={[styles.dataText, { fontWeight: 'bold' }]}>סטטוס עבודה</Text>
                    </View>
                    <View style={styles.detailsRow}>
                        <Text style={styles.dataText}>{system.LevelOfRisk}</Text>
                        <Text style={styles.dataText} >{system.status}</Text>
                    </View>

                </View >
                <View style={styles.dataRow}>
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        paddingBottom: '4%',
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: '6%',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom:'5%',
    },
    dataContainer:{
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderTopColor: '#d6d6d6',
    borderBottomColor: '#d6d6d6',
    marginBottom:'5%',
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
    fontSize: 16,
    marginVertical: '0.5%',
}

});