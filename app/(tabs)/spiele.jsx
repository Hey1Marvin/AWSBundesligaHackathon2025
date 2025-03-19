import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'


const app = () => {
  return (
    <View style={styles.container}>
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
    backgroundColor:'rgba(0,0,0, 0.5)',
  },
});