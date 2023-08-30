import {View, Text, Modal, TouchableOpacity, Linking} from 'react-native';
import React, {version} from 'react';
import remoteConfig from '@react-native-firebase/remote-config';
import DeviceInfo from 'react-native-device-info';
import {compareVersions} from '../utils/utils';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TEMPLATES} from '../utils/templates';

export default function UpdateComponent() {
  const [update, setUpdate] = React.useState('NO_UPDATE');
  const [updateVersion, setUpdateVersion] = React.useState('');

  const checkUpdate = async () => {
    const code = await DeviceInfo.getVersion();
    const version = remoteConfig().getValue('android_version');

    const current = code;
    const target = version.asString();
    setUpdateVersion(target);

    setUpdate(compareVersions(current, target));
  };

  React.useEffect(() => {
    remoteConfig().setConfigSettings({
      minimumFetchIntervalMillis: 5000,
    });

    remoteConfig()
      .setDefaults({
        android_version: '1.0.0',
        templates: TEMPLATES,
      })
      .then(() => remoteConfig().fetchAndActivate())
      .then(data => {
        checkUpdate();
      });
  }, []);

  return (
    <>
      <Modal
        onRequestClose={() => {
          setUpdate('NO_UPDATE');
        }}
        animationType="slide"
        visible={update === 'UPDATE'}
        transparent>
        <View
          className={`flex-1`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}>
          <TouchableOpacity
            onPress={() => {
              setUpdate('NO_UPDATE');
            }}
            className={`flex-1`}
          />
          <View className={`p-5 px-3 m-5 bg-zinc-800 rounded-lg`}>
            <View className={`flex justify-center items-center`}>
              <Icon color="white" name="update" size={50} />
              <Text
                className={`text-xl font-bold mt-4 text-center text-white mb-2`}>
                Update Available - {updateVersion}
              </Text>
              <Text
                className={`text-xs text-center opacity-75 text-white mb-5`}>
                A minor new version is available, You can either download new
                version now or you can try it out later.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setUpdate('NO_UPDATE');
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.tfcode.quoto',
                );
              }}
              className={`mt-3 bg-black rounded-full items-center flex-row py-3 px-4`}>
              <Icon color="white" name="download" size={20} />
              <Text
                className={`flex-1 text-center ml-2 text-md font-bold text-white`}>
                Update Now
              </Text>
              <View className={`opacity-0`}>
                <Icon color="white" name="dice-3-outline" size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setUpdate('NO_UPDATE');
              }}
              className={`mt-3 rounded-full items-center flex-row py-3 px-4`}>
              <Text
                className={`flex-1 text-center ml-2 text-xs font-bold text-white`}>
                Remind Me Later
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        onRequestClose={() => {
          // setUpdate('FORCE_UPDATE');
        }}
        animationType="slide"
        visible={update === 'FORCE_UPDATE'}
        transparent>
        <View
          className={`flex-1`}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
          }}>
          <TouchableOpacity onPress={() => {}} className={`flex-1`} />
          <View className={`p-5 px-3 m-5 bg-zinc-800 rounded-lg`}>
            <View className={`flex justify-center items-center`}>
              <Icon color="white" name="information-outline" size={50} />
              <Text
                className={`text-xl font-bold mt-4 text-center text-white mb-2`}>
                Oops ! Update Required
              </Text>
              <Text
                className={`px-5 text-xs text-center opacity-75 text-white mb-5`}>
                Apologies, support for this version is no longer available, so
                some features may not work. Please update to the new version on
                the Play Store.
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.tfcode.quoto',
                );
              }}
              className={`mt-3 bg-black rounded-full items-center flex-row py-3 px-4`}>
              <Icon color="white" name="download" size={20} />
              <Text
                className={`flex-1 text-center ml-2 text-md font-bold text-white`}>
                Update
              </Text>
              <View className={`opacity-0`}>
                <Icon color="white" name="dice-3-outline" size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
