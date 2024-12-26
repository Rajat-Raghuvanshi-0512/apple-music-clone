import React from 'react';
import { Text } from './ui/text';
import { Box } from './ui/box';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';

// Define the type for the props
type ListItemProps = {
  name: string; // The name to be displayed
  icon: keyof typeof MaterialIcons.glyphMap; // Icon name from MaterialIcons
};

const ListItem: React.FC<ListItemProps> = ({ name, icon }) => {
  return (
    <Box className="flex-row gap-5 items-center">
      <MaterialIcons
        className="!text-rose-500"
        name={icon} // Dynamic icon
        size={30}
      />
      <Box className="border-b-[0.5px] border-gray-800 justify-between items-center flex-row flex-1 py-3">
        {/* Render dynamic name passed as a prop */}
        <Text size="xl">{name}</Text>
        <Entypo name="chevron-right" size={20} className="!text-gray-600" />
      </Box>
    </Box>
  );
};

export default ListItem;
