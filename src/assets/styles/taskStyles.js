import { StyleSheet } from 'react-native';

export const taskStyles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    // Σκιά για iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Σκιά για Android
    elevation: 3,
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  time: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  statusIndicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusIndicatorCompleted: {
    backgroundColor: '#0066FF',
    borderColor: '#0066FF',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0066FF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  modalBox: { 
    width: '85%', 
    backgroundColor: 'white', 
    padding: 25, 
    borderRadius: 20 
  },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 15, 
    textAlign: 'center' 
  },
  input: { 
    borderBottomWidth: 1.5, 
    borderColor: '#0066FF', 
    marginBottom: 25, 
    padding: 10, 
    fontSize: 16 
  },
  btnCancel: { 
    padding: 10 
  },
  btnSave: { 
    backgroundColor: '#0066FF', 
    padding: 12, 
    borderRadius: 10, 
    minWidth: 100, 
    alignItems: 'center' 
  }

});