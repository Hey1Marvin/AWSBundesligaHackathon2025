import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';


const app = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={[styles.container,  {backgroundColor: Colors[colorScheme ?? 'light'].background}]}>
        <Text style={styles.text}>Spiele Tab</Text>
    </View>
  )
}

export default app

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: 'center',
    alignItems:'center',
  },
  text:{
    color:'white',
    fontSize:42,
    fontWeight: 'bold',
    textAlign:'center',
  },
});