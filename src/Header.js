import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';

const colors = {
    headerColor : "#298a5e"
}

const Header = props => {
  const {count} = props
  return (
    <View>
      <View style={styles.container}>
      <StatusBar backgroundColor={colors.headerColor} />
        <Text style={styles.text}>Realm DB </Text>
        <Text style={styles.items}>{count} Items</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.headerColor, 
    // alignItems: 'center',
    // justifyContent: 'center',
    // borderRadius:20,
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    borderCurve:10,
    marginBottom:1,
    flexDirection:"row",

  },
  text: {
    marginBottom:12,
    marginTop:10,
    fontSize: 25,
    color: 'white',
    // textAlign:"center",
    marginLeft:22,
    fontWeight: "bold",
    flex:0
    
  },
  items:{
    fontSize:25,
    marginTop:10,
    textAlign:"right",
    marginLeft:150,
    color:"white"
  }
});

export default Header;
