import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import remoteConfig from '@react-native-firebase/remote-config';

import {TEMPLATES} from '../../utils/templates';
import RenderQuotes from '../../components/RenderQuote';
import {shuffle} from '../../utils/utils';

export default function Templates({navigation}) {
  const [templates, setTemplates] = React.useState([]);

  React.useEffect(() => {
    try {
      const data = remoteConfig().getValue('templates');
      setTemplates(JSON.parse(data.asString()));
    } catch (err) {
      setTemplates(TEMPLATES);
    }
  }, []);

  return (
    <View className={`bg-black flex-1`}>
      {templates?.length > 0 ? (
        <FlatList
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <View className={``}>
              <Text className={`px-4 mb-2 text-white font-bold text-lg mt-2`}>
                {item.name}
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.quote}
                horizontal
                renderItem={({item, index}) => {
                  const width = item.ratio === 9 / 16 ? 2 : 3;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className={`mx-2 ${index === 0 ? 'ml-4' : 'ml-2'}`}
                      onPress={() => {
                        navigation.navigate('Create', {
                          item: item,
                          random: true,
                        });
                      }}
                      style={{
                        width: Dimensions.get('window').width / width,
                      }}>
                      <RenderQuotes width={width} data={item} />
                    </TouchableOpacity>
                  );
                }}
                data={shuffle(item.data)}
              />
            </View>
          )}
          data={templates}
        />
      ) : null}
    </View>
  );
}
