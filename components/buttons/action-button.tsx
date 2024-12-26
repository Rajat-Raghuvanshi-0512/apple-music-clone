import { Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

interface ActionButtonProps {
  label: string;
  icon?: ComponentProps<typeof Ionicons>['name'];
  onPress: () => void;
}

export const ActionButton = ({
  label,
  icon = 'play',
  onPress,
}: ActionButtonProps) => {
  const buttonIcon = icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      delayPressIn={50}
      delayPressOut={100}
      className="flex-row items-center justify-center rounded-xl py-3 px-6 bg-neutral-900"
    >
      <Ionicons
        name={buttonIcon}
        size={20}
        color="#ff3b5c"
        style={{ marginRight: 6 }}
      />
      <Text className="text-[#ff3b5c] font-medium text-lg">{label}</Text>
    </TouchableOpacity>
  );
};
