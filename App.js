import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, UrlTile} from 'react-native-maps';
import * as Location from 'expo-location';




export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [latitude, setLatitude] = useState(44.04444);
  const [longitude, setLongitude] = useState(42.86056);

  const [marker, setMarker] = useState( {
    latitude, longitude
  })

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const detectedLocation = await Location.getCurrentPositionAsync({});
      
      console.log(`latitude is ${detectedLocation.coords.latitude} longitude is${detectedLocation.coords.longitude}`)
      setLatitude(detectedLocation.coords.latitude);
      setLongitude(detectedLocation.coords.longitude);
      setMarker({
        latitude: detectedLocation.coords.latitude,
        longitude: detectedLocation.coords.longitude
      });  
      
      
    })();
  }, []);

  
  if (errorMsg) {
    console.log("Error" ,errorMsg)
  }


  const [region, setRegion] = useState({
    latitude,
    longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.01
  });

  

  const urlTemplate = "http://c.tile.openstreetmap.org/{z}/{x}/{y}.png";
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

        (loaded && marker) ? 
        <>
            <Marker
          coordinate={marker}
          />
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
    </>
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
