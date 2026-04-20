import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList
} from "react-native";

import { styles } from "../../src/assets/styles/homeStyles";
import MyCalendar from "../components/MyCalendar";
import TaskItem from "../components/TaskItem";
import AddTaskButton from "../components/AddTaskButton";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();

  // --- STATES ---
  const [menuVisible, setMenuVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<"tasks" | "calendar">("tasks");
  const [selectedDate, setSelectedDate] = useState("");

  // Προσωρινά δεδομένα για τα Tasks (Mock Data)
  const [tasks, setTasks] = useState([
    { id: "1", title: "Σχεδιασμός UI", time: "10:00 AM", isCompleted: false },
    { id: "2", title: "Meeting με πελάτη", time: "12:30 PM", isCompleted: true },
    { id: "3", title: "Γυμναστήριο", time: "06:00 PM", isCompleted: false },
  ]);

  // --- ANIMATION LOGIC ---
  const animValue = useRef(new Animated.Value(0)).current;

  const toggleDrawer = (open: boolean) => {
    if (open) {
      setDrawerVisible(true);
      Animated.timing(animValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setDrawerVisible(false));
    }
  };

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.75, 0],
  });

  const handleLogout = () => {
    setMenuVisible(false);
    router.replace("/");
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    ));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* --- HEADER --- */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerLeft}
          onPress={() => toggleDrawer(true)}
        >
          <Ionicons name="menu" size={28} color="#0066FF" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>
            {activeTab === "calendar" ? "Calendar" : "Task Manager"}
          </Text>
          <Text style={styles.headerSubtitle}>
            {activeTab === "calendar" ? "View your schedule" : "Welcome back!"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.headerRight}
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="settings-outline" size={26} color="#555" />
        </TouchableOpacity>
      </View>

      {/* --- ΚΥΡΙΩΣ ΠΕΡΙΕΧΟΜΕΝΟ (DYNAMIC) --- */}
      <View style={styles.content}>
        {activeTab === "calendar" ? (
          <View style={{ flex: 1, width: "100%", padding: 10 }}>
            <MyCalendar onDateSelect={(date: string) => {
              setSelectedDate(date);
              console.log("Selected from Main Screen:", date);
            }} />
            {selectedDate !== "" && (
              <Text style={{ marginTop: 20, textAlign: 'center', color: '#666', fontWeight: 'bold' }}>
                Tasks για: {selectedDate}
              </Text>
            )}
          </View>
        ) : (
          <View style={{ flex: 1, width: "100%", paddingHorizontal: 20 }}>
            {tasks.length > 0 ? (
              <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TaskItem
                    title={item.title}
                    time={item.time}
                    isCompleted={item.isCompleted}
                    onToggle={() => toggleTaskCompletion(item.id)}
                  />
                )}
                contentContainerStyle={{ paddingTop: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="clipboard-outline" size={80} color="#E0E0E0" />
                <Text style={styles.bodyText}>Δεν υπάρχουν tasks ακόμα.</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {/* --- FLOATING ACTION BUTTON --- */}
      {activeTab === "tasks" && (
        <AddTaskButton 
          onPress={() => console.log("Άνοιγμα Modal Προσθήκης...")} 
        />
      )}

      {/* --- ANIMATED SIDEBAR --- */}
      <Modal
        transparent={true}
        visible={drawerVisible}
        onRequestClose={() => toggleDrawer(false)}
      >
        <View style={styles.drawerOverlay}>
          <Animated.View
            style={[
              styles.drawerContent,
              {
                opacity: animValue,
                transform: [{ translateX }],
              },
            ]}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.drawerHeader}>
                <Text style={styles.drawerTitle}>Menu</Text>
                <TouchableOpacity onPress={() => toggleDrawer(false)}>
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setActiveTab("calendar");
                  toggleDrawer(false);
                }}
              >
                <Ionicons name="calendar" size={22} color={activeTab === "calendar" ? "#0066FF" : "#666"} />
                <Text style={[styles.drawerItemText, activeTab === "calendar" && { color: "#0066FF" }]}>Calendar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.drawerItem}
                onPress={() => {
                  setActiveTab("tasks");
                  toggleDrawer(false);
                }}
              >
                <Ionicons name="list" size={22} color={activeTab === "tasks" ? "#0066FF" : "#666"} />
                <Text style={[styles.drawerItemText, activeTab === "tasks" && { color: "#0066FF" }]}>All Tasks</Text>
              </TouchableOpacity>
              
              <View style={styles.separator} />

              <TouchableOpacity style={styles.drawerItem} onPress={() => toggleDrawer(false)}>
                <Ionicons name="time-outline" size={22} color="#666" />
                <Text style={styles.drawerItemText}>Pending</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.drawerItem} onPress={() => toggleDrawer(false)}>
                <Ionicons name="checkmark-done" size={22} color="#666" />
                <Text style={styles.drawerItemText}>Completed</Text>
              </TouchableOpacity>
            </ScrollView>
          </Animated.View>

          <Pressable
            style={styles.drawerCloseArea}
            onPress={() => toggleDrawer(false)}
          />
        </View>
      </Modal>

      {/* --- SETTINGS MODAL --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Επιλογές</Text>
            <TouchableOpacity style={styles.modalOption} onPress={() => setMenuVisible(false)}>
              <Ionicons name="person-outline" size={20} color="#333" />
              <Text style={styles.modalOptionText}>Settings</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            <TouchableOpacity style={styles.modalOption} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
              <Text style={[styles.modalOptionText, { color: "#FF3B30" }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}