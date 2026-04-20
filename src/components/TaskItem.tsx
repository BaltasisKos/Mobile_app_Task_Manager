import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { taskStyles as styles } from '../assets/styles/taskStyles';

// --- INTERFACES ---
interface TaskItemProps {
  title: string;
  time: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void; // Νέο prop για διαγραφή
  onEdit: () => void;   // Νέο prop για επεξεργασία
}

interface AddTaskButtonProps {
  onPress: () => void;
}

// --- COMPONENTS ---

// 1. Το κουμπί προσθήκης (FAB)
export const AddTaskButton: React.FC<AddTaskButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
};

// 2. Το μεμονωμένο Task
export const TaskItem: React.FC<TaskItemProps> = ({ 
  title, 
  time, 
  isCompleted, 
  onToggle, 
  onDelete, 
  onEdit 
}) => {

  // Συνάρτηση για επιβεβαίωση διαγραφής (προαιρετικά)
const confirmDelete = () => {
  console.log("Delete button pressed!");

  // Έλεγχος αν τρέχει σε browser
  if (typeof window !== 'undefined' && (window as any).confirm) {
    const confirmed = window.confirm("Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτό το task;");
    if (confirmed) {
      onDelete();
    }
  } else {
    // Για κινητά (Native Alert)
    Alert.alert(
      "Διαγραφή Task",
      "Είσαι σίγουρος ότι θέλεις να διαγράψεις αυτό το task;",
      [
        { text: "Ακύρωση", style: "cancel" },
        { text: "Διαγραφή", style: "destructive", onPress: onDelete }
      ]
    );
  }
};

  return (
    <View style={styles.card}>
      {/* Checkbox / Toggle Status */}
      <TouchableOpacity 
        style={[styles.statusIndicator, isCompleted && styles.statusIndicatorCompleted]} 
        onPress={onToggle}
      >
        {isCompleted && <Ionicons name="checkmark" size={16} color="white" />}
      </TouchableOpacity>

      {/* Κείμενο Task */}
      <TouchableOpacity style={styles.content} onPress={onEdit} activeOpacity={0.6}>
        <Text style={[styles.title, isCompleted && styles.completedTitle]}>
          {title}
        </Text>
        <Text style={styles.time}>{time}</Text>
      </TouchableOpacity>

      {/* Action Buttons: Edit & Delete */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onEdit} style={{ padding: 8 }}>
          <Ionicons name="create-outline" size={22} color="#0066FF" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={confirmDelete} style={{ padding: 8 }}>
          <Ionicons name="trash-outline" size={22} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );
};