import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, TextInput } from 'react-native';
import MainButton from '../components/MainButton';
import { Dropdown } from 'react-native-material-dropdown';
import { Checkbox } from '@material-ui/core';

const maxRisk = [
    { key: 1, value: 'דליפת גז רעיל' },
    { key: 2, value: 'דליפת גז רעיל/ פציץ' },
    { key: 3, value: 'שפיכת נוזל רעיל' },
    { key: 4, value: 'שפיכת נוזל רעיל/ פציץ' },
    { key: 5, value: 'פיצוץ BLEVE' },
    { key: 6, value: 'פיצוץ UVCE' },
    { key: 7, value: 'ריאקציה מסוכנת' },
    { key: 8, value: 'פיצוץ או דליקה בסמוך לחומ"ס' },
    { key: 9, value: 'הצפה או מפגע אחר בסמוך לחומ"ס' },
    { key: 10, value: 'שיבוש סימון או רישום של חומ"ס' },
    { key: 11, value: 'שפיכת חומ"ס למערכת הביוב' },
    { key: 12, value: 'שפיכת חומ"ס לסביבה' },
    { key: 13, value: 'שפיכת חומ"ס לנחל או לים' },
    { key: 14, value: 'תקלה מסכנת חיים אחרת' },
    { key: 15, value: 'תקלה מסכנת סביבה אחרת' },
    { key: 16, value: 'תקלה שאינה מסכנת חיים או סביבה' },

]

export default NewSystemScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textStyle}>שם המערכת</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="מערכת כלשהי"
            />
            <Text style={styles.textStyle}>חומרים מסוכנים בשימוש המערכת</Text>
            <TextInput
                style={styles.textArea}
                placeholder="חומר כלשהו"
                numberOfLines={10}
                multiline={true}
            />
            <Dropdown
                style={styles.dropDown}
                label="סיכון מקסימלי"
                data={maxRisk}
                lineWidth={0}
                activeLineWidth={0}
                disabledLineWidth={0}
            />

            <MainButton
                title="הוספה לרשימת המערכות"
                onPress={() => { navigation.navigate('Systems') }}
                width="65%" margin="20%"
            />
<Checkbox label="I Agree" value="agree" checked={true} />

        </View>
    );

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
        borderWidth:1,
        borderColor: '#169BD5',
       textAlign:'center',
        height:40
    },
});

