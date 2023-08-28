import {
  View,
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MyTabBar({state, descriptors, navigation}) {
  return (
    <View style={{flexDirection: 'row'}}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({name: route.name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableNativeFeedback
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            <View
              className={`bg-zinc-900 justify-center items-center flex-1 px-2 py-2 border-t-2`}
              style={{
                borderColor: isFocused ? 'white' : 'black',
              }}>
              <Icon
                style={{
                  opacity: isFocused ? 1 : 0.5,
                }}
                color={'white'}
                size={25}
                name={
                  label === 'My Quotos'
                    ? 'file'
                    : label === 'Settings'
                    ? 'cog'
                    : 'dots-grid'
                }
              />
              <Text
                className={`mt-1 text-center text-white`}
                style={{
                  opacity: isFocused ? 1 : 0.5,
                  fontSize: 10,
                }}>
                {label}
              </Text>
            </View>
          </TouchableNativeFeedback>
        );
      })}
    </View>
  );
}

export default MyTabBar;
