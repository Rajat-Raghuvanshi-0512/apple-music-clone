import { Tabs } from 'expo-router';
import React, { FC, useState } from 'react';
import { tabsData } from '@/utils';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';
import ActiveMusicBar from '@/components/common/ActiveMusicBar';
import FullScreenBottomSheet from '@/components/ui/bottom-sheets/FullScreenBottomSheet';
import { useAppSelector } from '@/store/hooks';
import PlayerScreen from '@/components/player/PlayerScreen';

interface ITabIcon {
  focused: boolean;
  icon: React.ElementType;
  iconName: string;
}

const TabIcon: FC<ITabIcon> = ({ focused, icon: Icon, iconName }) => {
  return (
    <Icon name={iconName} color={focused ? '#FA2E46' : '#808080'} size={26} />
  );
};

export default function TabLayout() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { currentTrack } = useAppSelector((state) => state.music);

  const displayImage = currentTrack?.image ?? currentTrack?.artwork;

  return (
    <View className="flex-1">
      <ActiveMusicBar setIsBottomSheetOpen={setIsBottomSheetOpen} />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#FA2E46',
          headerShown: false,
          tabBarBackground: () => (
            <BlurView intensity={0} className="absolute inset-0" />
          ),
        }}
      >
        {tabsData.map((tab) => (
          <Tabs.Screen
            key={tab.screenName}
            name={tab.screenPath}
            options={{
              title: tab.screenName,
              tabBarStyle: {
                borderTopWidth: 0,
                height: 90,
                paddingTop: 10,
              },
              tabBarIcon: ({ focused }) => (
                <TabIcon
                  focused={focused}
                  icon={tab.icon}
                  iconName={tab.iconName}
                />
              ),
            }}
          />
        ))}
      </Tabs>
      <FullScreenBottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        backgroundImage={displayImage}
      >
        <PlayerScreen />
      </FullScreenBottomSheet>
    </View>
  );
}
