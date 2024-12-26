import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  // Tab Routes
  '(tabs)': undefined;
  index: undefined;
  browse: undefined;
  radio: undefined;
  library: undefined;
  search: undefined;

  // Other Routes
  'playlist/[id]': { id: string };
  '+not-found': undefined;
};

export type NavigationType = NativeStackNavigationProp<RootStackParamList>;
