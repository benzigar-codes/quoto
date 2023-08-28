import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  Modal,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage, {MY_FILES} from '../../utils/storage';
import RenderQuotes from '../../components/RenderQuote';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../components/TabBar';
import Templates from '../temp';

// {
//   "id" : "aljsdlfjskldjf",
//   "quote": "This is intresting for now",
//   "font" : "BEBAS",
//   "fontSize" : 20,
//   "backgroundType" : "COLOR",
//   "quoteColor" : "white",
//   "backgroundColor" : "#9A3B3B",
//   "backgroundImage" : "https://i.pinimg.com/564x/8a/fd/e7/8afde7187013cdece677de522d1d39f6.jpg",
//   "quoteVerticalAlign" : "CENTER",
//   "author" : "",
//   "quoteHorizontalAlign" : "CENTER",
//   "logoUrl" : ""
// }

const Tab = createMaterialTopTabNavigator();

const Recent = ({navigation}) => {
  const [showPicker, setPicker] = React.useState(false);
  const [quotes, setQuotes] = useMMKVStorage(MY_FILES, storage, []);

  React.useEffect(() => {
    if (quotes?.length === 0) setPicker(true);
  }, [quotes]);

  const handleLongPress = id => {
    Alert.alert(
      'Delete Confirmation',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setQuotes(quotes?.filter(e => e?.id !== id));
          },
          style: 'destructive',
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View className={`bg-black pt-3 flex-1`}>
      <Modal
        onDismiss={() => {
          setPicker(false);
        }}
        animationType="slide"
        visible={showPicker}
        transparent>
        <View
          className={`flex-1`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}>
          <TouchableOpacity
            onPress={() => {
              setPicker(false);
            }}
            className={`flex-1`}
          />
          <View className={`p-5 px-3 m-5 bg-zinc-800 rounded-lg`}>
            <View className={`flex justify-center items-center`}>
              <Icon color="white" name="sparkles" size={50} />
              <Text
                className={`mt-4 text-xs text-center opacity-75 text-white mb-5`}>
                You can create a quote by one of the following, you can later
                edit the quote and can share in social media.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Create', {
                  random: false,
                });
                setPicker(false);
              }}
              className={`bg-black rounded-full items-center flex-row py-3 px-4`}>
              <IconMaterial color="white" name="file" size={20} />
              <Text
                className={`flex-1 text-center ml-2 text-md font-bold text-white`}>
                Create from Blank
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Create', {
                  random: true,
                });
                setPicker(false);
              }}
              className={`mt-3 bg-black rounded-full items-center flex-row py-3 px-4`}>
              <IconMaterial color="white" name="dice-3-outline" size={20} />
              <Text
                className={`flex-1 text-center ml-2 text-md font-bold text-white`}>
                Random Quote
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Templates', {
                  random: true,
                });
                setPicker(false);
              }}
              className={`mt-3 bg-black rounded-full items-center flex-row py-3 px-4`}>
              <IconMaterial color="white" name="folder-open" size={20} />
              <Text
                className={`flex-1 text-center ml-2 text-md font-bold text-white`}>
                Choose from templates
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {quotes?.length > 0 ? (
        <>
          <FlatList
            numColumns={3}
            renderItem={({item}) => (
              <TouchableOpacity
                onLongPress={() => {
                  handleLongPress(item.id);
                }}
                onPress={() => {
                  navigation.navigate('Create', {
                    item: item,
                  });
                }}
                className={`p-1`}
                style={{
                  width: Dimensions.get('window').width / 3,
                }}>
                <RenderQuotes width={3} forceSquare={true} data={item} />
              </TouchableOpacity>
            )}
            data={quotes?.reverse()}
          />
        </>
      ) : (
        <View className={`flex flex-1 justify-center items-center`}>
          <IconMaterial color="white" name="format-quote-close" size={60} />
          <Text className={`text-white font-bold text-lg`}>
            No Quotes created yet
          </Text>
          <Text className={`text-white text-xs opacity-50`}>
            Tap the button below to get started.
          </Text>
        </View>
      )}
      <View
        className={`absolute bottom-0 left-0 right-0 justify-center items-center`}>
        <TouchableOpacity
          onPress={() => {
            setPicker(true);
          }}
          className={`bg-white flex-row items-center px-5 py-2 rounded-full mb-5`}>
          <Text className={`text-black mr-1 font-bold text-md`}>Create</Text>
          <Icon color="black" size={15} name="sparkles" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Home({navigation}) {
  return (
    <View className={`bg-black flex-1`}>
      <View
        className={`bg-zinc-900 py-2 px-4 flex-row justify-between items-center`}>
        <View className={`flex flex-row items-center`}>
          <IconMaterial color="white" name="format-quote-close" size={40} />
          <Text className={`text-white font-bold text-lg`}>Quoto</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings');
          }}>
          <IconMaterial color="white" name="cog" size={25} />
        </TouchableOpacity>
      </View>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="Recent" component={Recent} />
        <Tab.Screen name="Templates" component={Templates} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </View>
  );
}
