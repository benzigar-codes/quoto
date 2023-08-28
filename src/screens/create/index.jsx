import {
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  ScrollView,
  TextInput,
  Image,
  FlatList,
  BackHandler,
  Modal,
} from 'react-native';
import {Switch} from 'react-native-switch';
import React from 'react';
import ViewShot from 'react-native-view-shot';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import Slider from 'react-native-slider';

import {
  generateUniqueID,
  getRandomBackground,
  getRandomColors,
  getRandomFont,
  getRandomQuote,
} from '../../utils/utils';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useMMKVStorage} from 'react-native-mmkv-storage';
import storage, {MY_FILES} from '../../utils/storage';
import RenderLogo from '../../components/RenderLogo';

const colors = [
  // Light Colors
  '#FFFFFF', // White
  '#FF5733', // Vibrant Orange
  '#3498DB', // Cerulean Blue
  '#27AE60', // Emerald Green
  '#F39C12', // Goldenrod
  '#1ABC9C', // Turquoise
  '#2ECC71', // Shamrock Green
  '#2980B9', // Sapphire Blue
  '#16A085', // Jungle Green
  '#F39C12', // Sunflower Yellow

  // Dark Colors
  '#000000', // Black
  '#6A1B9A', // Deep Purple
  '#E74C3C', // Crimson Red
  '#9B59B6', // Amethyst Purple
  '#E67E22', // Carrot Orange
  '#8E44AD', // Royal Purple
  '#D35400', // Pumpkin
  '#8E44AD', // Deep Lilac
  '#34495E', // Dark Slate Gray
  '#C0392B', // Firebrick Red
  '#27AE60', // Ocean Green
  '#3498DB', // Dodger Blue
];

const ratio = [
  {title: '1/1', value: 1 / 1},
  {title: '16/9', value: 16 / 9},
  {title: '4/5', value: 4 / 5},
  {title: '9/16', value: 9 / 16},
  {title: '3/2', value: 3 / 2},
  {title: '2/3', value: 2 / 3},
];

const fonts = [
  {
    name: 'Bebas',
    value: 'BEBAS',
  },
  {
    name: 'Dancing',
    value: 'DANCING',
  },
  {
    name: 'Oswald',
    value: 'OSWALD',
  },
  {
    name: 'Playfair',
    value: 'PLAYFAIR',
  },
  {
    name: 'Quick Sand',
    value: 'QUICKSAND',
  },
  {
    name: 'Vibes',
    value: 'VIBES',
  },
];

const defaultValue = {
  quote: '',
  font: 'BEBAS',
  fontSize: 45,
  backgroundType: 'COLOR',
  quoteColor: 'white',
  backgroundColor: '#8E44AD',
  backgroundImage: '',
  quoteVerticalAlign: 'CENTER',
  author: '',
  quoteHorizontalAlign: 'CENTER',
  logoUrl: '',
  ratio: 4 / 5,
  lastUpdated: new Date(),
};

export default function Home({route, navigation}) {
  const ref = React.useRef();

  const [quotes, setQuotes] = useMMKVStorage(MY_FILES, storage, []);
  const [activeEditor, setActiveEditor] = React.useState(false);
  const [data, setData] = React.useState(
    route?.params?.item
      ? {...defaultValue, ...route?.params?.item}
      : defaultValue,
  );
  const [watermark, setWatermark] = React.useState(true);
  const [watermarkPicker, setWatermarkPicker] = React.useState(false);

  const [history, setHistory] = React.useState([data]);

  const preventBack = React.useRef(false);
  const [text, setText] = React.useState(data.quote);

  const options = [
    {
      name: 'Text',
      icon: 'format-text',
      editor: 'TEXT',
    },
    {
      name: 'Font',
      icon: 'format-font',
      editor: 'FONT',
    },
    {
      name: 'Size',
      icon: 'format-size',
      editor: 'SIZE',
    },
    {
      name: 'Color',
      icon: 'format-color-highlight',
      editor: 'COLOR',
    },
    {
      name: 'BG',
      icon: 'format-color-fill',
      editor: 'BG',
    },
    // {
    //   name: 'Logo',
    //   icon: 'alpha-l-circle',
    //   editor: 'LOGO',
    // },
    {
      name: 'Ratio',
      icon: 'aspect-ratio',
      editor: 'RATIO',
    },
  ];

  const save = () => {
    ref.current.capture().then(uri => {
      Share.open({
        url: uri,
        social: Share.Social.WHATSAPP,
      });
    });
  };

  const handleBackButton = () => {
    if (preventBack.current) {
      setActiveEditor(false);
      return true;
    } else return false;
  };

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    if (activeEditor) preventBack.current = true;
    else preventBack.current = false;
  }, [activeEditor]);

  React.useEffect(() => {
    if (data && data?.id) {
      if (quotes?.find(e => e.id === data.id)) {
        const removedQuotes = quotes.filter(e => e.id !== data.id);
        setQuotes([...removedQuotes, data]);
      } else {
        setQuotes([...quotes, data]);
      }
    } else {
      const background = getRandomBackground();

      let updateData = {
        id: generateUniqueID(),
      };
      if (route?.params?.random) {
        updateData = {
          ...updateData,
          backgroundImage: data?.backgroundImage
            ? data?.backgroundImage
            : background,
          font: data?.font ? data?.font : getRandomFont(),
          backgroundColor: background ? 'black' : getRandomColors(),
        };
      } else {
        setActiveEditor('TEXT');
      }
      setData({
        ...data,
        ...updateData,
      });
    }
  }, [data]);

  React.useEffect(() => {
    setData({
      ...data,
      quote: text,
    });
  }, [text]);

  React.useEffect(() => {
    if (!text && !route?.params?.item && route.params?.random === true)
      setText(getRandomQuote());
  }, []);

  const undo = () => {
    if (history[history.length - 2]) {
      const newHistory = history.pop();
      // alert(JSON.stringify(history[history.length - 2]));
      setData({
        ...data,
        ...history[history.length - 2],
      });
      setHistory(newHistory);
    }
  };

  return (
    <View className={`bg-black flex-1`}>
      <View className={`bg-zinc-900 px-4 flex-row items-center`}>
        <TouchableOpacity
          className={`flex-1 py-2 `}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon color="white" name="close" size={30} />
        </TouchableOpacity>
        <View className={`flex-row items-center`}>
          <TouchableOpacity>
            <Icon color="white" name="format-quote-close" size={40} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={save}
          className={`py-2 flex-1 flex-row justify-end items-center`}>
          {/* <TouchableOpacity
            style={{
              opacity: history?.length > 1 ? 1 : 0.5,
            }}
            onPress={undo}
            className={`mr-1`}>
            <Icon size={25} color="white" name="undo" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={save}>
            <Icon size={25} color="#97FFF4" name="share" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
      <Modal
        onDismiss={() => {
          setPicker(false);
        }}
        animationType="slide"
        visible={watermarkPicker}
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
          <View className={`p-5 px-3 m-5 bg-zinc-800 rounded-lg`}>
            <View className={`flex justify-center items-center`}>
              <Icon color="white" name="watermark" size={50} />
              <Text
                className={`mt-4 text-center text-white font-bold text-2xl mb-5`}>
                Watermark
              </Text>
              <Text
                className={`text-xs text-center opacity-75 text-white mb-5`}>
                Watermarks help us reach more audience to install Quoto. Place
                remove watermark only if you have no other option.
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                setWatermark(!watermark);
              }}
              className={`rounded-full justify-between items-center flex-row py-1 px-2`}>
              <View className={`flex flex-row items-center`}>
                <Text className={`text-center text-md font-bold text-white`}>
                  Show Watermark
                </Text>
              </View>
              <Icon
                style={{
                  opacity: watermark ? 1 : 0.4,
                }}
                color="white"
                name={watermark ? 'toggle-switch' : 'toggle-switch-off'}
                size={40}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setWatermarkPicker(false);
              }}
              className={`mt-2 bg-black rounded-full items-center flex-row py-3 px-4`}>
              <View className={`opacity-0`}>
                <Icon color="white" name="file" size={20} />
              </View>
              <Text
                className={`flex-1 text-center ml-2 text-md font-bold text-white`}>
                Done
              </Text>
              <View className={`opacity-0`}>
                <Icon color="white" name="file" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <ScrollView
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <View className={`w-full justify-center px-3`}>
          <ViewShot
            ref={ref}
            options={{fileName: 'Quote-Maker', format: 'jpg', quality: 0.9}}
            className={`relative overflow-hidden flex rounded-md bg-zinc-900`}
            style={{
              backgroundColor: data.backgroundColor,
              justifyContent:
                data.quoteVerticalAlign === 'CENTER' ? 'center' : 'flex-start',
              alignItems:
                data.quoteHorizontalAlign === 'CENTER'
                  ? 'center'
                  : 'flex-start',
              aspectRatio: data.ratio,
            }}>
            {watermark ? (
              <RenderLogo
                onPress={() => {
                  setWatermarkPicker(true);
                }}
              />
            ) : null}
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
            {activeEditor === 'TEXT' ? (
              <TextInput
                selectTextOnFocus
                autoFocus
                onChangeText={e => {
                  setText(e);
                }}
                style={{
                  fontSize: data.fontSize,
                  color: data.quoteColor,

                  fontFamily: data?.font,
                }}
                multiline={true}
                className={`text-center text-white px-3`}
                value={text}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setActiveEditor('TEXT');
                }}>
                <Text
                  style={{
                    fontSize: data.fontSize,
                    color: data.quoteColor,
                    fontFamily: data?.font,
                  }}
                  className={`text-center text-white px-3`}>
                  {text}
                </Text>
              </TouchableOpacity>
            )}

            {data?.author ? (
              <Text
                style={{
                  color: data?.quoteColor,
                }}>
                {'- ' + data?.author}
              </Text>
            ) : null}
          </ViewShot>
        </View>
      </ScrollView>
      <View className={`pl-4 bg-black py-2`}>
        {activeEditor === 'SIZE' ? (
          <View className={`mb-2 flex-row items-center`}>
            <TouchableOpacity
              className={`py-2`}
              onPress={() => {
                setActiveEditor(false);
              }}>
              <Icon color="white" name="close" size={30} />
            </TouchableOpacity>
            <View className={`flex-1 px-5`}>
              <Slider
                className={`flex-1`}
                minimumValue={10}
                maximumValue={100}
                step={5}
                value={data.fontSize}
                onValueChange={value =>
                  setData({
                    ...data,
                    fontSize: value,
                    lastUpdated: new Date(),
                  })
                }
              />
            </View>
            <TouchableOpacity
              className={`py-2`}
              onPress={() => {
                setActiveEditor(false);
                setHistory([
                  ...history,
                  {
                    fontSize: data.fontSize,
                  },
                ]);
              }}>
              <Icon color="white" name="check" size={30} />
            </TouchableOpacity>
          </View>
        ) : activeEditor === 'FONT' ? (
          <View className={`border-b-2 mb-3 pb-3 border-zinc-600`}>
            <ScrollView
              contentContainerStyle={{
                flex: 1,
              }}
              horizontal
              showsHorizontalScrollIndicator={true}>
              {fonts?.map(each => (
                <TouchableOpacity
                  onPress={() => {
                    setData({
                      ...data,
                      font: each.value,
                      lastUpdated: new Date(),
                    });
                    setHistory([
                      ...history,
                      {
                        font: each.value,
                      },
                    ]);
                  }}
                  className={`${
                    data.font === each.value
                      ? 'border-white'
                      : 'border-zinc-600'
                  } mr-2 border-2 p-2 bg-zinc-900 rounded-md flex flex-col justify-center items-center`}>
                  <Text
                    className={`text-white text-lg`}
                    style={{
                      fontFamily: each.value,
                    }}>
                    ABC
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        ) : activeEditor === 'COLOR' ? (
          <View
            className={`flex-row items-center border-b-2 mb-3 pb-3 border-zinc-600`}>
            <TouchableOpacity
              className={`py-2 px-2`}
              onPress={() => {
                setActiveEditor(false);
              }}>
              <Icon color="white" name="close" size={30} />
            </TouchableOpacity>
            <FlatList
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setData({
                      ...data,
                      quoteColor: item,
                      lastUpdated: new Date(),
                    });
                    setHistory([
                      ...history,
                      {
                        quoteColor: item,
                      },
                    ]);
                  }}
                  style={{
                    backgroundColor: item,
                  }}
                  className={` mr-2 p-5 border-2 border-white bg-zinc-900 rounded-md flex flex-col justify-center items-center`}></TouchableOpacity>
              )}
              data={colors}
            />
          </View>
        ) : activeEditor === 'BG' ? (
          <View
            className={`flex-row items-center border-b-2 mb-3 pb-3 border-zinc-600`}>
            <TouchableOpacity
              className={`py-2 px-2`}
              onPress={() => {
                setActiveEditor(false);
              }}>
              <Icon color="white" name="close" size={30} />
            </TouchableOpacity>
            <TouchableOpacity
              className={`pr-2`}
              onPress={() => {
                setData({
                  ...data,
                  backgroundColor: 'black',
                  backgroundImage: getRandomBackground(
                    data?.backgroundImage ?? 'something',
                  ),
                });
                setHistory([
                  ...history,
                  {
                    backgroundColor: 'black',
                    backgroundImage: getRandomBackground(
                      data?.backgroundImage ?? 'something',
                    ),
                  },
                ]);
              }}>
              <Icon color="white" name="file-image" size={45} />
            </TouchableOpacity>
            <FlatList
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setData({
                      ...data,
                      backgroundImage: '',
                      backgroundColor: item,
                      lastUpdated: new Date(),
                    });
                    setHistory([
                      ...history,
                      {
                        backgroundImage: '',
                        backgroundColor: item,
                      },
                    ]);
                  }}
                  style={{
                    backgroundColor: item,
                  }}
                  className={` mr-2 p-5 border-2 border-white bg-zinc-900 rounded-md flex flex-col justify-center items-center`}></TouchableOpacity>
              )}
              data={colors}
            />
          </View>
        ) : activeEditor === 'RATIO' ? (
          <View
            className={`flex-row items-center border-b-2 mb-3 pb-3 border-zinc-600`}>
            <TouchableOpacity
              className={`py-2 px-2`}
              onPress={() => {
                setActiveEditor(false);
              }}>
              <Icon color="white" name="close" size={30} />
            </TouchableOpacity>
            <FlatList
              horizontal
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    setData({
                      ...data,
                      ratio: item.value,
                      lastUpdated: new Date(),
                    });
                    setHistory([
                      ...history,
                      {
                        ratio: item.value,
                      },
                    ]);
                  }}
                  style={{
                    aspectRatio: item.value,
                  }}
                  className={`h-20 mr-2 border-2 ${
                    data.ratio === item.value
                      ? 'border-white'
                      : 'border-zinc-500'
                  } bg-zinc-900 rounded-md flex flex-col justify-center items-center`}>
                  <Text className={`text-white text-xs`}>{item.title}</Text>
                </TouchableOpacity>
              )}
              data={ratio}
            />
          </View>
        ) : null}
        <ScrollView
          keyboardShouldPersistTaps="always"
          horizontal
          showsHorizontalScrollIndicator={false}>
          {options?.map(each => (
            <TouchableOpacity
              key={each.editor}
              onPress={() => {
                if (activeEditor === each.editor) setActiveEditor(false);
                else setActiveEditor(each.editor);
              }}
              className={`mr-3 flex flex-col justify-center items-center`}>
              <View
                className={`border-2 p-4 ${
                  activeEditor === each.editor
                    ? `bg-white border-white`
                    : `bg-zinc-900 border-zinc-600`
                } rounded-full aspect-square flex flex-col justify-center items-center`}>
                <Icon
                  size={20}
                  color={activeEditor === each.editor ? 'black' : 'white'}
                  name={each.icon}
                />
              </View>
              <Text className={`mt-1 font-bold text-xs text-white`}>
                {each.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
