
import React, { useReducer } from 'react';
import { StyleSheet } from 'react-native';
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
