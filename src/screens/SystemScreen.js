import React from 'react';
import { Text, StyleSheet, View, Button, TouchableOpacity, FlatList } from 'react-native';

export default SystemScreen = (props) => {
    const question =
        { questionNumber: 1, title: 'מספר העובדים החשופים למכונות אדם- מכונה (HMI) הקשורים לחומ"ס', answer1: 'עד 5', answer2: '5-10', answer3: '10-50', answer4: 'מעל 40' }

        const { route } = props;
        const system=route.params.item;

    return (
        <View style={styles.container}>
            <Option text='תיאור המערכת'/>
            <Option text='חישוב רמת חשיפה' onPress={()=>{props.navigation.navigate('Question',{question,totalQuestions:80})}}/>
            <Option text='חישוב רמת סיכון' />
            <Option text='בקרות' onPress={() => { props.navigation.navigate('Control') }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,

    },

});