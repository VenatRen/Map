import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {UrlTile} from 'react-native-maps';




export default function App() {

  const [region, setRegion] = useState({latitude: 44.04444,
    longitude: 42.86056,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,});
  const [urlTemplate, setUrlTemplate] = useState("http://c.tile.openstreetmap.org/{z}/{x}/{y}.png")
  const [loaded, setLoaded] = useState(false);

  

  return (
    <View style={styles.container}>
     
     <MapView
          style={{width: "100%", height: "100%"}}
          initialRegion={region}
          onRegionChange={setRegion}
          onLayout={()=>{console.log('loaded');setLoaded(true)}}
      >  
      {

        loaded ? 
        <UrlTile
    /**
     * The url template of the tile server. The patterns {x} {y} {z} will be replaced at runtime
     * For example, http://c.tile.openstreetmap.org/{z}/{x}/{y}.png
     */
    urlTemplate={urlTemplate}
    /**
     * The maximum zoom level for this tile overlay. Corresponds to the maximumZ setting in
     * MKTileOverlay. iOS only.
     */
    maximumZ={19}
    /**
     * flipY allows tiles with inverted y coordinates (origin at bottom left of map)
     * to be used. Its default value is false.
     */
    flipY={false}
  />
  : <></>

      }
      
  </MapView>


    </View>
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
