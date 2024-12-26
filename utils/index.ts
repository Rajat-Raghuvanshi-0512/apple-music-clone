import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const tabsData = [
  {
    screenName: 'Home',
    screenPath: 'index',
    icon: Ionicons,
    iconName: 'home',
  },
  {
    screenName: 'Browse',
    screenPath: 'browse',
    icon: AntDesign,
    iconName: 'appstore1',
  },
  {
    screenName: 'Radio',
    screenPath: 'radio',
    icon: Ionicons,
    iconName: 'radio',
  },
  {
    screenName: 'Library',
    screenPath: 'library',
    icon: MaterialCommunityIcons,
    iconName: 'music-box-multiple',
  },
  {
    screenName: 'Search',
    screenPath: 'search',
    icon: Ionicons,
    iconName: 'search',
  },
];

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
