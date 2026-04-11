import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Platform, 
  StatusBar, 
  Modal, 
  Pressable, 
  Animated,
  Dimensions 
} from 'react-native';
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; 

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  
  // --- STATES ---
  const [menuVisible, setMenuVisible] = useState(false); // Για το Settings Modal
  const [drawerVisible, setDrawerVisible] = useState(false); // Για το Sidebar

  // --- ANIMATION LOGIC ---
  // animValue: 0 σημαίνει κλειστό/αόρατο, 1 σημαίνει ανοιχτό/πλήρως ορατό
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

  // Interpolation για την κίνηση από αριστερά (-300 pixels προς 0)
  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width * 0.75, 0], 
  });

  const handleLogout = () => {
    setMenuVisible(false);
    router.replace("/");
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
          <Text style={styles.headerTitle}>Task Manager</Text>
          <Text style={styles.headerSubtitle}>Welcome back!</Text>
        </View>

        <TouchableOpacity 
          style={styles.headerRight} 
          onPress={() => setMenuVisible(true)}
        >
          <Ionicons name="settings-outline" size={26} color="#555" />
        </TouchableOpacity>
      </View>

      {/* --- ANIMATED SIDEBAR (HAMBURGER MENU) --- */}
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
                transform: [{ translateX }] 
              }
            ]}
          >
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>Menu</Text>
              <TouchableOpacity onPress={() => toggleDrawer(false)}>
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>
            
            <TouchableOpacity style={styles.drawerItem} onPress={() => { console.log("All Tasks"); toggleDrawer(false); }}>
              <Ionicons name="list" size={22} color="#0066FF" />
              <Text style={styles.drawerItemText}>All Tasks</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => { console.log("Pending"); toggleDrawer(false); }}>
              <Ionicons name="time-outline" size={22} color="#0066FF" />
              <Text style={styles.drawerItemText}>Pending</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.drawerItem} onPress={() => { console.log("Completed"); toggleDrawer(false); }}>
              <Ionicons name="checkmark-done" size={22} color="#0066FF" />
              <Text style={styles.drawerItemText}>Completed</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Κενός χώρος δεξιά που κλείνει το μενού */}
          <Pressable style={styles.drawerCloseArea} onPress={() => toggleDrawer(false)} />
        </View>
      </Modal>

      {/* --- SETTINGS MODAL (CENTER) --- */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={menuVisible}
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setMenuVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Επιλογές</Text>
            
            <TouchableOpacity style={styles.modalOption} onPress={() => setMenuVisible(false)}>
              <Ionicons name="person-outline" size={20} color="#333" />
              <Text style={styles.modalOptionText}>Settings</Text>
            </TouchableOpacity>
            
            <View style={styles.separator} />
            
            <TouchableOpacity style={styles.modalOption} onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={20} color="#FF3B30" />
              <Text style={[styles.modalOptionText, { color: '#FF3B30' }]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      {/* --- ΚΥΡΙΩΣ ΠΕΡΙΕΧΟΜΕΝΟ --- */}
      <View style={styles.content}>
        <Ionicons name="clipboard-outline" size={80} color="#E0E0E0" />
        <Text style={styles.bodyText}>Εδώ θα εμφανίζονται τα tasks σου.</Text>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    backgroundColor: '#fff',
  },
  headerLeft: { flex: 1, alignItems: 'flex-start' },
  headerCenter: { flex: 2, alignItems: 'center' },
  headerRight: { flex: 1, alignItems: 'flex-end' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#0066FF' },
  headerSubtitle: { fontSize: 11, color: '#666' },

  // SIDEBAR STYLES
  drawerOverlay: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawerContent: {
    width: '75%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 50,
    paddingHorizontal: 20,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  drawerCloseArea: {
    flex: 1,
  },
  drawerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0066FF',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  drawerItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
    fontWeight: '500',
  },

  // MODAL STYLES (CENTER)
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 260,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
  },
  modalOptionText: {
    fontSize: 16,
    marginLeft: 15,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEE',
    width: '100%',
  },

  // CONTENT
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  bodyText: {
    marginTop: 10,
    fontSize: 16,
    color: '#AAA',
  }
});