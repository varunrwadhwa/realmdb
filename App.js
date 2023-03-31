import React, {useEffect, useRef, useState} from 'react';
import Realm from 'realm';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  BackHandler,
  Animated
} from 'react-native';

import {
  deleteOne,
  updateTodoList,
  deleteTodoList,
  insertNewTodoList,
  deleteAllTodoList,
  daytabase,
} from './src/allscema';
import MyModal from './src/modal';
import SplashScreen from "react-native-splash-screen";
import Header from './src/Header';

const App = () => {
  const [state, setState] = useState({
    id: null,
    name: null,
  });

  const [dataa, setDataa] = useState([]);
  console.log('here', dataa);
  const [modalv, setModalV] = useState(false);
  const [modalTitle, setmodalTitle] = useState();
  const [disableButtonCreate,setDisableButtonCreate] = useState(true);
  const [disableButtonDeleteAll,setDisableButtonDeleteAll] = useState(true);
  const [textInputColor1,setTextInputColor1] = useState(false)
  const [textInputColor2,setTextInputColor2] = useState(false)
  const [close,setClose] = useState(false)
  const [scale] = useState([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ]);

  useEffect(() => {
    (async () => {
      try {
        let mydata = await daytabase();
        setDataa(mydata);
      } catch (err) {}
    })();
    SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress',onBackPress)
  }, []);

  let clearNumInput = useRef();
  let clearTextInput = useRef();

  const showModal = (title) => {
    setModalV(true);
    setmodalTitle(title);
  };

  const hideModal = () => {
    setModalV(false);
  };

  const deleteallfunc = () => {
    showModal('Database Cleared');
    deleteAllTodoList();
  };

  const insertfunc = () => {
    insertNewTodoList(state);
  };

  const onBackPress = () => {
    showModal('Are you sure you want to quit ?');
    setClose(true);
    setTimeout(()=>{setClose(false)},5000)
    return true;
  }

  // const takingID = text => {
  //   text = parseInt(text);
  //   setState(prevstate => {return {...prevstate, id: parseInt(text)}});
  //   state.id? setDisableButtonCreate(false) : setDisableButtonCreate(true)
  // };

  // const takingName = text => {
  //   setState(prevstate => {
  //     return {...prevstate, name: text};
  //   });
  //   state.name? setDisableButtonCreate(false) : setDisableButtonCreate(true)
  // };

  const updaytfunc = () => {
    showModal(`Updated with '${state.name}' for ID ${state.id}`);
    updateTodoList(state);
  };

  const deleteOneFunc = () => {
    showModal(`Data of ID ${state.id} Cleared `);
    deleteOne(state.id);
  };

  const showDatabase = () => {
    (async () => {
      try {
        let mydata = await daytabase();
        setDataa(mydata);
      } catch (err) {}
    })();
  };

  const Listofthings = () => {
    return (
      <View style={{marginBottom:55}}>
        <Text style={styles.texti}>Database is Below :</Text>
        {dataa.map(ite => {
          return (
            <View style={styles.Viewdb}>
              <Text style={styles.texDb}>ID : {ite.id}</Text>
              <Text style={styles.texDb}>NAME : {ite.name}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  const EmptyDB = () => {
    return (
      <Text style={styles.emptyDb}>Database is Empty, Feed Something</Text>
    );
  };

  const showDB = () => {
    showDatabase();
  };

  useEffect(()=>{
    (state.name && state.id)? setDisableButtonCreate(false) : setDisableButtonCreate(true)
    // dataa.length>0?setDisableButtonDeleteAll(false):setDisableButtonDeleteAll(true)
  },[state.id,state.name])

  useEffect(()=>{
    dataa.length>0?setDisableButtonDeleteAll(false):setDisableButtonDeleteAll(true)
  })

  const clearInputID=(refVarID)=>{
    refVarID.current.clear()
    setState(prevState=>{return {...prevState, id:null}})
  }

  const clearInputName=(refVarName)=>{
    refVarName.current.clear()
    setState(prevState=>{return {...prevState,name:null}})
  }
  
  // const colorChange = ()=> {
  //   console.log("WORKs");
  // }

  const onPressInX = (i) => {
    animateScale(1.5, i); // scale up the button
    setTimeout(()=>{animateScale(1,i)},1500)
  };

  const onPressIn = (i) => {
    animateScale(0.5, i); // scale up the button
  };

  const onPressOut = (i) => {
    animateScale(1, i); // scale down the button
  };

  const scaleStyle = (i) => {
    return {
      transform: [{scale: scale[i]}],
    };
  };

  const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
    TouchableOpacity
  );

  const animateScale = (value, i) => {
    Animated.timing(scale[i], {
      toValue: value,
      duration: 150,
      useNativeDriver: true,
    }).start();
  };

  let updateStyle = textInputColor1? styles.inputFocused : null 
  let updateStyle2 = textInputColor2? styles.inputFocused : null 
  return (
    
    <View style={{backgroundColor: '#e0c56e', width: '100%', height: '100%'}}>
      <Header count={dataa.length}/>
      <KeyboardAvoidingView>
        <ScrollView>
          <View style={[styles.textInputView,updateStyle]}>
            <TextInput
              placeholderTextColor={'grey'}
              keyboardType="phone-pad"
              style={styles.textinputi}
              placeholder=" Numeric ID..."
              onChangeText={text =>setState(prevstate => {return {...prevstate, id: parseInt(text)}})}
              ref={clearNumInput}
              onFocus={()=>setTextInputColor1(true)}
              onBlur={()=>setTextInputColor1(false)}></TextInput>
            {state.id ? (<TouchableOpacity style={scaleStyle(5)} onPress={() => clearInputID(clearNumInput)} onPressIn={() => onPressInX(5)}>
              <Text style={styles.cutButton}> X </Text>
            </TouchableOpacity>):null}
          </View>
          <View style={[styles.textInputView,updateStyle2]}>
            <TextInput
              placeholderTextColor={'grey'}
              style={styles.textinputi}
              placeholder=" Text..."
              onChangeText={text => setState(prevstate => {return {...prevstate, name: text}})}
              ref={clearTextInput}
              onFocus={()=>setTextInputColor2(true)}
              onBlur={()=>setTextInputColor2(false)}></TextInput>
            {state.name ? (<TouchableOpacity style={scaleStyle(6)} onPress={() => clearInputName(clearTextInput)} onPressIn={() => onPressInX(6)} >
              <Text style={styles.cutButton}> X </Text>
            </TouchableOpacity>): null}
          </View>
          <AnimatedTouchableOpacity
            disabled={disableButtonCreate}
            style={[{backgroundColor: disableButtonCreate? '#754148':'#808000' },styles.buttonCreate,scaleStyle(0)]} 
            onPress={insertfunc}
            onPressIn={() => onPressIn(0)}
            onPressOut={() => onPressOut(0)}>
            <Text style={[{color: disableButtonCreate? 'grey':'white' },styles.texDisabled]}> Create </Text>
          </AnimatedTouchableOpacity>
          <AnimatedTouchableOpacity
            disabled={disableButtonDeleteAll}
            style={[{backgroundColor: disableButtonDeleteAll? '#754148':'#808000' },styles.buttonCreate,scaleStyle(1)]}
            onPress={deleteallfunc}
            onPressIn={() => onPressIn(1)}
            onPressOut={() => onPressOut(1)}>
            <Text style={[{color: disableButtonDeleteAll? 'grey':'white' },styles.texDisabled]}> Delete All </Text>
          </AnimatedTouchableOpacity>
          <AnimatedTouchableOpacity 
            disabled={disableButtonDeleteAll}
            style={[{backgroundColor: disableButtonDeleteAll? '#754148':'#808000' },styles.buttonCreate,scaleStyle(2)]} 
            onPress={deleteOneFunc}
            onPressIn={() => onPressIn(2)}
            onPressOut={() => onPressOut(2)}>
            <Text style={[{color: disableButtonDeleteAll? 'grey':'white' },styles.texDisabled]}> Delete One </Text>
          </AnimatedTouchableOpacity>
          <AnimatedTouchableOpacity 
            disabled={disableButtonCreate}
            style={[{backgroundColor: disableButtonCreate? '#754148':'#808000' },styles.buttonCreate,scaleStyle(3)]} 
            onPress={updaytfunc}
            onPressIn={() => onPressIn(3)}
            onPressOut={() => onPressOut(3)}>
            <Text style={[{color: disableButtonCreate? 'grey':'white' },styles.texDisabled]}> Update </Text>
          </AnimatedTouchableOpacity>
          <AnimatedTouchableOpacity 
            style={[styles.button,scaleStyle(4)]} 
            onPress={showDB} 
            onPressIn={() => onPressIn(4)}
            onPressOut={() => onPressOut(4)}>
            <Text style={styles.tex}> Show Database </Text>
          </AnimatedTouchableOpacity>

          {dataa.length ? <Listofthings /> : <EmptyDB />}
          <MyModal title={modalTitle} show={modalv} hide={hideModal} close={close}/>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  data: {
    color: 'red',
    fontSize: 20,
    textAlign: 'justify',
    fontWeight: '800',
    marginLeft: 20,
  },
  texti: {
    marginTop: 10,
    color: 'black',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '400',
  },
  textinputi: {
    borderRadius:20,
    fontSize: 30,
    flex: 6,
    color:"black"
  },
  button: {
    backgroundColor:'#808000',
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  buttonCreate: {
    padding: 15,
    marginTop: 20,
    borderRadius: 20,
    marginLeft: 10,
    marginRight: 10,
  },
  tex: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
  },
  texDisabled: {
    textAlign: 'center',
    fontSize: 30
  },
  texDb: {
    marginTop: 10,
    color: 'black',
    fontSize: 25,
    textAlign: 'left',
    fontWeight: '400',
    marginLeft: 20,
    fontStyle: 'italic',
  },
  Viewdb: {
    marginBottom: 20,
  },
  textInputView: {
    backgroundColor: '#EFE7D3',
    marginBottom: 20,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 20,
    flexDirection: 'row',
  },
  inputFocused : {
    borderColor:'red',
    borderWidth:3,
  },
  cutButton: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
    flexDirection: 'row',
    marginTop: 10,
    marginRight: 20,
    flex: 1,
  },
  emptyDb: {
    marginTop: 30,
    color: '#b30000',
    fontSize: 25,
    textAlign: 'left',
    fontWeight: '400',
    marginLeft: 20,
    fontStyle: 'italic',
  },
});

export default App;

// complete the app with all the error messages
// change the input fucntion and directly put value in useState
// when there is nothing for update show modal that says put something 
// splashscreen