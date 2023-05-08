import {View, Text} from 'react-native';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import React from 'react';

const Ble = () => {
  return (
    <MapView region={this.state.region} onRegionChange={this.onRegionChange}>
  {this.state.markers.map((marker, index) => (
    <Marker
      key={index}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
</MapView>
  );
};

export default Ble;
