import { Tabs } from 'expo-router';
import React, { FC } from 'react';
import { tabsData } from '@/utils';
import { BlurView } from 'expo-blur';
import { View } from 'react-native';
import ActiveMusicBar from '@/components/common/ActiveMusicBar';

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
  return (
    <View className="flex-1">
      <ActiveMusicBar />
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
    </View>
  );
}
