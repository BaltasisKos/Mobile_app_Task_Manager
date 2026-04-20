import { StyleSheet } from 'react-native';

export const calendarStyles = StyleSheet.create({
  container: { 
    padding: 10, 
    backgroundColor: '#fff', 
    borderRadius: 10,
    width: '100%' 
  },
  headerRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  monthHeader: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#333' 
  },
  weekRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 10 
  },
  weekText: { 
    fontWeight: 'bold', 
    color: '#888',
    width: 40,
    textAlign: 'center'
  },
  dayBox: { 
    flex: 1, 
    height: 45, 
    justifyContent: 'center', 
    alignItems: 'center',
    margin: 1,
    borderRadius: 5
  },
  dayText: {
    fontSize: 14,
    color: '#333'
  },
  emptyBox: {
    flex: 1,
    height: 45
  }
});