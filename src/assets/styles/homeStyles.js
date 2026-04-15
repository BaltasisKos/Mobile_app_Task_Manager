// assets/homeStyles.js
import { StyleSheet, Platform, StatusBar } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    // Υπολογισμός για το StatusBar σε Android
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
  headerLeft: { 
    flex: 1, 
    alignItems: 'flex-start' 
  },
  headerCenter: { 
    flex: 2, 
    alignItems: 'center' 
  },
  headerRight: { 
    flex: 1, 
    alignItems: 'flex-end' 
  },
  headerTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#0066FF' 
  },
  headerSubtitle: { 
    fontSize: 11, 
    color: '#666' 
  },

  // SIDEBAR (DRAWER) STYLES
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

  // ΚΥΡΙΟ ΠΕΡΙΕΧΟΜΕΝΟ
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