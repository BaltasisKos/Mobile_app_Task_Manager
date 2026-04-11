import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from "expo-router";
// Εισαγωγή εικονιδίων
import { Ionicons } from '@expo/vector-icons'; 

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER SECTION */}
      <View style={styles.header}>
        
        {/* ΑΡΙΣΤΕΡΑ: Hamburger Menu */}
        <TouchableOpacity style={styles.headerLeft} onPress={() => console.log("Menu Pressed")}>
          <Ionicons name="menu" size={28} color="#0066FF" />
        </TouchableOpacity>

        {/* ΚΕΝΤΡΟ: Τίτλος */}
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Task Manager</Text>
          <Text style={styles.headerSubtitle}>Welcome back!</Text>
        </View>

        {/* ΔΕΞΙΑ: Logout */}
        <TouchableOpacity 
          style={styles.headerRight} 
          onPress={() => router.replace("/")}
        >
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
        </TouchableOpacity>

      </View>

      {/* MAIN CONTENT SECTION */}
      <View style={styles.content}>
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
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  // Χρησιμοποιούμε flex: 1 σε όλα για να μοιραστεί ο χώρος δίκαια
  headerLeft: {
    flex: 1,
    alignItems: 'flex-start',
  },
  headerCenter: {
    flex: 2, // Δίνουμε περισσότερο χώρο στο κέντρο
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0066FF',
  },
  headerSubtitle: {
    fontSize: 11,
    color: '#666',
  },
  logoutButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FFF0F0',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  bodyText: {
    fontSize: 16,
    color: '#999',
  }
});