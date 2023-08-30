import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Touchable,
  Alert,
  Linking,
  Modal,
  TextInput,
  Image,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage, {MY_FILES, SETTINGS} from '../../utils/storage';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// {
//   "authorName" : "Benzigar"
// }

export default function Settings({navigation}) {
  const [quotes, setQuotes] = useMMKVStorage(MY_FILES, storage, []);
  const [settings, setSettings] = useMMKVStorage(SETTINGS, storage, []);
  const [showAuthorPicker, setAuthorPicker] = React.useState(false);
  const [authorDetails, setAuthorDetails] = React.useState({
    authorName: '',
    authorImage: '',
  });

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

  const loadImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
    });
    if (result && result?.assets?.length > 0 && result?.assets?.[0]?.uri) {
      const imageUrl = result?.assets?.[0]?.uri;
      setAuthorDetails({
        ...authorDetails,
        authorImage: imageUrl,
      });
    }
  };

  return (
    <View className={`bg-black flex-1`}>
      <Modal
        onRequestClose={() => {
          setAuthorPicker(false);
        }}
        animationType="slide"
        visible={showAuthorPicker}
        transparent>
        <View
          className={`flex-1`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}>
          <TouchableOpacity
            onPress={() => {
              setAuthorPicker(false);
            }}
            className={`flex-1`}
          />
          <View className={`p-5 px-3 m-5 bg-zinc-800 rounded-lg`}>
            <View className={`flex justify-center items-center`}>
              <Icon color="white" name="pen" size={50} />
              <Text
                className={`text-xl font-bold mt-4 text-center text-white mb-2`}>
                Author Details
              </Text>
              <Text
                className={`text-xs text-center opacity-75 text-white mb-5`}>
                Tell us the deails of the author and we will add the author
                details in all the quotes that you export.
              </Text>
            </View>
            <View
              className={`px-4 py-1 mt-3 font-bold bg-black rounded-full items-center flex-row`}>
              <TouchableOpacity onPress={loadImage}>
                {authorDetails.authorImage ? (
                  <Image
                    className={`aspect-square rounded-full h-10`}
                    source={{
                      uri: authorDetails.authorImage,
                    }}
                  />
                ) : (
                  <Icon color="white" name="image-edit-outline" size={30} />
                )}
              </TouchableOpacity>
              <TextInput
                autoFocus
                onChangeText={e => {
                  setAuthorDetails({
                    ...authorDetails,
                    authorName: e,
                  });
                }}
                value={authorDetails.authorName}
                className={`py-2 px-2 font-bold flex-1`}
                placeholder="Author Name"
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setSettings({
                  ...settings,
                  ...authorDetails,
                });
                setAuthorPicker(false);
                setTimeout(() => {
                  setAuthorDetails({
                    ...authorDetails,
                    authorName: '',
                    authorImage: '',
                  });
                }, 100);
              }}
              className={`mt-3 bg-black rounded-full items-center flex-row py-3 px-4`}>
              <Icon color="white" name="check" size={20} />
              <Text
                className={`flex-1 text-center ml-2 text-md font-bold text-white`}>
                Done
              </Text>
              <View className={`opacity-0`}>
                <Icon color="white" name="dice-3-outline" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setAuthorDetails({
                  ...authorDetails,
                  authorName: '',
                  authorImage: '',
                });
                setAuthorPicker(false);
                setSettings({
                  ...settings,
                  authorName: '',
                  authorImage: '',
                });
              }}
              className={`mt-4 rounded-full items-center flex-row py- px-4`}>
              <Text
                className={`flex-1 text-center ml-2 text-xs font-bold text-white`}>
                Remove Author
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* <View className={`bg-zinc-900 px-4 flex-row items-center`}>
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
      </View> */}
      <ScrollView className={`mx-3`}>
        <Text className={`mt-2 text-white font-bold text-3xl`}>Settings</Text>
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
        <TouchableOpacity
          onPress={() => {
            setAuthorPicker(true);
            setAuthorDetails({
              ...authorDetails,
              authorName: settings?.authorName ?? '',
              authorImage: settings?.authorImage ?? '',
            });
          }}
          className={`mt-3 flex items-center flex-row justify-between`}>
          <View className={`flex flex-row items-center`}>
            <Icon size={25} color={'white'} name="fountain-pen-tip" />
            <View className={`ml-1`}>
              <Text className={`text-md text-white`}>Author</Text>
              {settings?.authorName ? (
                <View className={`flex flex-row items-center`}>
                  {/* {settings?.authorImage ? (
                    <Image
                      className={`h-4 rounded-full aspect-square`}
                      source={{
                        uri: settings?.authorImage,
                      }}
                    />
                  ) : null} */}
                  <Text className={`text-xs`}>
                    {settings?.authorName ?? 'Benzigar'}
                  </Text>
                </View>
              ) : null}
            </View>
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
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.tfcode.quoto',
            );
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
          Linking.openURL('https://www.24code.in/');
        }}>
        <Text className={`text-white text-center text-sm mb-2 font-bold`}>
          Made with ❤️ by 24code.in
        </Text>
      </TouchableOpacity>
    </View>
  );
}
