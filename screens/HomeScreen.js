import React from 'react';
import { Text, StyleSheet,View, Button, TouchableOpacity } from 'react-native';

const HomeScreen = () =>{
    return(
        <view>
             <Button
        onPress={() => navigation.navigate('components')}
        title="Go to Componnents Demo" 
      />
      <Button 
        onPress={()=>navigation.navigate('List')}
        title="Go to List Demo" 
      />
       <Button 
        onPress={()=>navigation.navigate('Image')}
        title="Go to Image Demo" 
      />
        </view>
    )
}