import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import * as Location from 'expo-location';
import MapItem from './MapItem'
import OurToast from "./components/OurToast";
import { reducer, initialState } from "./reducer";
import { stateContext, dispatchContext } from "./contexts";




export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    
		<stateContext.Provider value={state}>
			<dispatchContext.Provider value={dispatch}>
        <MapItem/>
        <OurToast/>
      </dispatchContext.Provider>
		</stateContext.Provider>
			

  );

  

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
