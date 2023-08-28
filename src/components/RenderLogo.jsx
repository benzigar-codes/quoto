import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function RenderLogo({onPress = () => {}}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`rounded-tl-md z-10 bg-white text-white px-2 py-1 absolute bottom-0 right-0`}>
      <Text
        style={{
          fontSize: 10,
        }}
        className={`text-black text-xs`}>
        Made with <Text className={`font-bold`}>Quoto</Text>
      </Text>
    </TouchableOpacity>
  );
}
