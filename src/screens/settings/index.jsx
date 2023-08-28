import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Touchable,
  Alert,
  Linking,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage, {MY_FILES} from '../../utils/storage';

export default function Settings({navigation}) {
  const [quotes, setQuotes] = useMMKVStorage(MY_FILES, storage, []);

  const clearAllRecentData = () => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete all the recent data?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setQuotes([]);
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View className={`bg-black flex-1`}>
      <View className={`bg-zinc-900 px-4 flex-row items-center`}>
        <TouchableOpacity
          className={`flex-1 py-2 `}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon color="white" name="close" size={25} />
        </TouchableOpacity>
        <View className={`flex-row items-center`}>
          <TouchableOpacity>
            <Icon color="white" name="format-quote-close" size={40} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className={`opacity-0 flex-1 py-2 flex-row justify-end`}>
          <Icon size={25} color="#97FFF4" name="content-save" />
        </TouchableOpacity>
      </View>
      <ScrollView className={`mx-3`}>
        <Text className={`mt-4 text-white font-bold text-3xl`}>Settings</Text>
        <TouchableOpacity
          onPress={clearAllRecentData}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="database" />
            <Text className={`ml-1 text-md text-white`}>
              Clear All Recent Data
            </Text>
          </View>
          <Icon size={25} color={'white'} name="chevron-right" />
        </TouchableOpacity>
        <View className={`h-1 mt-3 bg-zinc-800`} />
        <Text className={`mt-5 text-white font-bold text-xl`}>Other Links</Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('mailto:24code.apps@gmail.com');
          }}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="chat" />
            <Text className={`ml-1 text-md text-white`}>Give Feedback</Text>
          </View>
          <Icon size={25} color={'white'} name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('mailto:24code.apps@gmail.com');
          }}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="share-variant" />
            <Text className={`ml-1 text-md text-white`}>Invite Friends</Text>
          </View>
          <Icon size={25} color={'white'} name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.24code.in/p/terms');
          }}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="information" />
            <Text className={`ml-1 text-md text-white`}>
              Terms And Conditions
            </Text>
          </View>
          <Icon size={25} color={'white'} name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.24code.in/p/privacy');
          }}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="lock" />
            <Text className={`ml-1 text-md text-white`}>Privacy Policy</Text>
          </View>
          <Icon size={25} color={'white'} name="chevron-right" />
        </TouchableOpacity>
        <View className={`h-1 mt-3 bg-zinc-800`} />
        <Text className={`mt-5 text-white font-bold text-xl`}>
          Follow us on
        </Text>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.24code.in/');
          }}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="web" />
            <Text className={`ml-1 text-md text-white`}>Website</Text>
          </View>
          <Icon size={25} color={'white'} name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://twitter.com/24code_in');
          }}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="twitter" />
            <Text className={`ml-1 text-md text-white`}>Twitter</Text>
          </View>
          <Icon size={25} color={'white'} name="chevron-right" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.linkedin.com/company/24code-in');
          }}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="linkedin" />
            <Text className={`ml-1 text-md text-white`}>Linkedin</Text>
          </View>
          <Icon size={25} color={'white'} name="chevron-right" />
        </TouchableOpacity>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL('https://www.linkedin.com/company/24code-in');
        }}>
        <Text className={`text-white text-center text-sm mb-2 font-bold`}>
          Made with ❤️ by 24code.in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
