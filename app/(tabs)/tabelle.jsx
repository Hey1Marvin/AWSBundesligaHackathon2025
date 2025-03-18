import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

import bundesligaLogo from "@/assets/images/bundesliga_logo.png"

const app = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Bundesliga AI</Text>

        <Image
        source={bundesligaLogo}
        resizeMode=''>
        </Image>

        <Link href="/contact" style={{marginHorizontal:'auto'}}
         asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>
            Explore
          </Text>
        </Pressable>
        </Link>

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
    Image:{
      width:'50%',
      height:'50%',
      flex: 1,
      justifyContent: 'center',
      alignItems:'center',
      marginBottom:120,
    },
    text:{
      color:'white',
      fontSize:42,
      fontWeight: 'bold',
      textAlign:'center',
      backgroundColor:'rgba(0,0,0, 0.5)',
    },
    link:{
      color:'white',
      fontSize:42,
      fontWeight: 'bold',
      textAlign:'center',
      textDecorationLine:"underline",
      padding:4,
      backgroundColor:'rgba(0,0,0, 0.5)',
    },
    button:{
      height:60,
      borderRadius:20,
      backgroundColor:'rgba(0,0,0, 0.75)',
      justifyContent:'center',
    },
    buttonText:{
      color:'white',
      fontSize:16,
      fontWeight: 'bold',
      textAlign:'center',
      padding:4,
    },
});