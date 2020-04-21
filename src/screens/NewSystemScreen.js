import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList, TextInput } from 'react-native';
import MainButton from '../components/MainButton';
import { Dropdown } from 'react-native-material-dropdown';

const maxRisk = [
    { value: 'דליפת גז רעיל' },
    { value: 'דליפת גז רעיל/ פציץ' },
    { value: 'שפיכת נוזל רעיל' },
    { value: 'שפיכת נוזל רעיל/ פציץ' },
    { value: 'פיצוץ BLEVE' },
    { value: 'פיצוץ UVCE' },
    { value: 'ריאקציה מסוכנת' },
    { value: 'פיצוץ או דליקה בסמוך לחומ"ס' },
    { value: 'הצפה או מפגע אחר בסמוך לחומ"ס' },
    { value: 'שיבוש סימון או רישום של חומ"ס' },
    { value: 'שפיכת חומ"ס למערכת הביוב' },
    { value: 'שפיכת חומ"ס לסביבה' },
    { value: 'שפיכת חומ"ס לנחל או לים' },
    { value: 'תקלה מסכנת חיים אחרת' },
    { value: 'תקלה מסכנת סביבה אחרת' },
    { value: 'תקלה שאינה מסכנת חיים או סביבה' },

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
            {/* <Dropdown
                style={styles.dropDown}
                label="סיכון מקסימלי"
                data={maxRisk}
                lineWidth={0}
                activeLineWidth={0}
                disabledLineWidth={0}
            /> */}


            <MainButton
                title="הוספה לרשימת המערכות"
                onPress={() => { navigation.navigate('Systems') }}
                width="65%" margin="20%" />

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
    }
});

