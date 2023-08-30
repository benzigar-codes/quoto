import {MMKVLoader, useMMKVStorage} from 'react-native-mmkv-storage';

const storage = new MMKVLoader().initialize();

// KEYS
export const MY_FILES = 'MY_FILES';
export const TEMPLATES = 'TEMPLATES';
export const SETTINGS = 'SETTINGS';

export default storage;
