import React from 'react'
import { ScrollView } from 'react-native';
import Hotel from './Hotel';
import { HotelsInfo } from 'sm/utils/Constants';
import hotelImg from 'sm/assets/hotel.png'

export default function () {
  const items = HotelsInfo.hotels.map(e => <Hotel key={e.hotelRate} source={hotelImg}
    hotelName={e.hotelName} hotelRate={e.hotelRate} distance={e.distance} />);

  return <ScrollView horizontal={true}>
    {items}
  </ScrollView>
}