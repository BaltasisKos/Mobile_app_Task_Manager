import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { taskStyles as styles } from '../assets/styles/taskStyles';

// Ορίζουμε τι δεδομένα χρειάζεται το TaskItem
interface TaskItemProps {
  title: string;
  time: string;
  isCompleted: boolean;
  onToggle: () => void; // Συνάρτηση για να αλλάζουμε το status (done/not done)
}

interface AddTaskButtonProps {
  onPress: () => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
};

const TaskItem: React.FC<TaskItemProps> = ({ title, time, isCompleted, onToggle }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onToggle} activeOpacity={0.7}>
      {/* Checkbox εικονίδιο */}
      <View style={[styles.statusIndicator, isCompleted && styles.statusIndicatorCompleted]}>
        {isCompleted && <Ionicons name="checkmark" size={16} color="white" />}
      </View>

      {/* Κείμενο Task */}
      <View style={styles.content}>
        <Text style={[styles.title, isCompleted && styles.completedTitle]}>
          {title}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </View>

      {/* Προαιρετικό βέλος ή εικονίδιο πληροφοριών */}
      <Ionicons name="chevron-forward" size={20} color="#EEE" />
    </TouchableOpacity>
  );
};

export default TaskItem;