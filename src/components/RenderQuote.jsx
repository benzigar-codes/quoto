import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import RenderLogo from './RenderLogo';

export default function RenderQuotes({
  width = 1,
  forceSquare = false,
  data = {},
  showRenderLogo = false,
}) {
  return (
    <View
      options={{fileName: 'Quote-Maker', format: 'jpg', quality: 0.9}}
      className={`overflow-hidden flex rounded-md bg-zinc-900`}
      style={{
        backgroundColor: data.backgroundColor,
        justifyContent:
          data.quoteVerticalAlign === 'CENTER' ? 'center' : 'flex-start',
        alignItems:
          data.quoteHorizontalAlign === 'CENTER' ? 'center' : 'flex-start',
        aspectRatio: forceSquare ? 1 / 1 : data.ratio,
      }}>
      {showRenderLogo ? <RenderLogo /> : false}
      {data?.backgroundImage ? (
        <>
          <Image
            className={`h-full w-full absolute inset-0`}
            source={{
              uri: data?.backgroundImage,
            }}
          />
          <View
            className={`h-full w-full bg-black opacity-30 absolute inset-0`}
          />
        </>
      ) : null}
      <View>
        <Text
          style={{
            fontSize: data.fontSize / width,
            color: data.quoteColor,
            fontFamily: data?.font,
          }}
          className={`text-center text-white px-3`}>
          {data?.quote}
        </Text>
      </View>
      {forceSquare === false && data?.ratio === 9 / 16 && data?.authorName ? (
        <View className={`mt-2 flex-row items-center`}>
          {data?.authorImage ? (
            <Image
              style={{
                width: 50 / width,
              }}
              className={`mr-2 aspect-square rounded-full`}
              source={{
                uri: data?.authorImage,
              }}
            />
          ) : (
            <Text
              style={{
                color: data?.quoteColor,
              }}>
              {'- '}
            </Text>
          )}
          <Text
            style={{
              color: data?.quoteColor,
              fontSize: 25 / width,
            }}
            className={`text-sm italic`}>
            {data?.authorName}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
