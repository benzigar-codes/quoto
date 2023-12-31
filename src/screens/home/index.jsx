import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Alert,
  Modal,
  Image,
} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import InAppReview from 'react-native-in-app-review';

import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage, {MY_FILES} from '../../utils/storage';
import RenderQuotes from '../../components/RenderQuote';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import CustomTabBar from '../../components/TabBar';
import messaging from '@react-native-firebase/messaging';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Templates from '../temp';
import Settings from '../settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import constantUtils from '../../utils/constants';

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

// const Tab = createMaterialTopTabNavigator();

const Tab = createBottomTabNavigator();

const Recent = ({navigation}) => {
  const [showPicker, setPicker] = React.useState(false);
  const [quotes, setQuotes] = useMMKVStorage(MY_FILES, storage, []);
  const lottieRef = React.useRef(null);

  React.useEffect(() => {
    if (quotes?.length === 0) setPicker(true);
  }, []);

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

  React.useEffect(() => {
    lottieRef.current?.play();
  }, []);

  const askForReview = async () => {
    const ifReviewed = await AsyncStorage.getItem(constantUtils.isRated);

    if (!ifReviewed && InAppReview.isAvailable()) {
      InAppReview.RequestInAppReview()
        .then(async hasFlowFinishedSuccessfully => {
          if (hasFlowFinishedSuccessfully) {
            await AsyncStorage.setItem(
              constantUtils.isRated,
              JSON.stringify(true),
            );
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  const updateAppOpenCount = async () => {
    let storedCount = await AsyncStorage.getItem(constantUtils.appOpen);
    if (!storedCount) {
      storedCount = 1;
      await AsyncStorage.setItem(constantUtils.appOpen, JSON.stringify(1));
    } else {
      const count = JSON.parse(storedCount);
      if (count > 2) askForReview();
      await AsyncStorage.setItem(
        constantUtils.appOpen,
        JSON.stringify(count + 1),
      );
    }
  };

  React.useEffect(() => {
    updateAppOpenCount();
  }, []);

  return (
    <View className={`bg-black pt-3 flex-1`}>
      <Modal
        onRequestClose={() => {
          setPicker(false);
        }}
        animationType="slide"
        visible={showPicker}
        transparent>
        <View
          className={`flex-1`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}>
          <TouchableOpacity
            onPress={() => {
              setPicker(false);
            }}
            className={`flex-1`}
          />
          <View className={`p-5 px-3 m-5 bg-zinc-900 rounded-lg`}>
            <View className={`flex justify-center items-center`}>
              {/* <Icon color="white" name="sparkles" size={50} /> */}
              <LottieView
                style={{height: 100, width: 100}}
                ref={lottieRef}
                autoPlay
                loop
                source={require('../../json/spark.json')}
              />
              <Text
                className={`text-xl font-bold mt-4 text-center text-white mb-2`}>
                Make Quoto
              </Text>
              <Text
                className={`text-xs text-center opacity-75 text-white mb-5`}>
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
            data={quotes}
          />
        </>
      ) : (
        <View className={`flex flex-1 justify-center items-center`}>
          <IconMaterial color="white" name="format-quote-close" size={80} />
          <Text className={`text-white font-bold text-lg`}>
            No Quotes created yet
          </Text>
          <Text className={`text-white text-xs opacity-50`}>
            Tap the button below to get started.
          </Text>
        </View>
      )}
      <View
        className={`absolute bottom-0 left-0 right-0 justify-center items-end`}>
        <TouchableOpacity
          onPress={() => {
            setPicker(true);
          }}
          className={`flex-row bg-black items-center rounded-full mb-5 mr-5`}>
          <Icon color="white" size={60} name="add-circle-sharp" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function Home({navigation}) {
  React.useEffect(() => {
    const handleNotificationClick = async notification => {
      if (notification.data?.item) {
        navigation.navigate('Create', {
          item: JSON.parse(notification.data?.item),
          random: true,
        });
      }
    };

    const unsubscribe = messaging().onNotificationOpenedApp(
      handleNotificationClick,
    );

    messaging()
      .getInitialNotification()
      .then(notification => {
        if (notification) {
          handleNotificationClick(notification);
        }
      });

    return () => unsubscribe();
  }, []);

  return (
    <View className={`bg-black flex-1`}>
      <View
        className={`bg-black py-2 px-4 flex-row justify-between items-center`}>
        <View className={`flex flex-row items-center`}>
          <IconMaterial color="white" name="format-quote-close" size={40} />
          <Text className={`text-white font-bold text-lg`}>Quoto</Text>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          swipeEnabled: false,
        }}
        tabBar={props => <CustomTabBar {...props} />}>
        <Tab.Screen name="My Quotos" component={Recent} />
        <Tab.Screen name="Templates" component={Templates} />
        <Tab.Screen name="Settings" component={Settings} />
        {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
      </Tab.Navigator>
    </View>
  );
}
