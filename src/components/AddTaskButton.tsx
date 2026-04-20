import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { taskStyles as style } from '../assets/styles/taskStyles';

interface AddTaskButtonProps {
  onPress: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={style.fab} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default AddTaskButton;