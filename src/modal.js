import React, { useState } from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet, BackHandler} from 'react-native';

const MyModal = props => {
  const{title,show=false ,hide=()=>{},close}=props
  // let flag = close;
  const hideModal = () => {
    hide()
    close ? BackHandler.exitApp() : null
  };

  const hideModal2 = () => {
    hide()
    // flag = false;
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={hideModal}
        hardwareAccelerated={true} >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{title}</Text>
            <View style={styles.buttAlign}>
            <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={hideModal}>
              <Text style={styles.textStyle}>    OK    </Text>
            </TouchableOpacity>
            {close && <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={hideModal2}>
              <Text style={styles.textStyle}>    Cancel    </Text>
            </TouchableOpacity>}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 0,
    backgroundColor: '#26977B',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderColor:"black",
    borderWidth:5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalText: {
    fontSize:20,
    marginBottom: 15,
    textAlign: "center",
    color:"black"
  },
  button: {
    marginTop:20,
    borderRadius: 5,
    padding: 15,
    elevation: 4,
    marginRight:5
  },
  buttonOpen: {
    backgroundColor: "red",
  },
  buttonClose: {
    backgroundColor: "black",
  },
  textStyle: {
    color: "white",
    fontSize:15,
    fontWeight: "bold",
    textAlign: "center"
  },
  buttAlign:{
    flexDirection:"row",
  }
});

export default MyModal;
