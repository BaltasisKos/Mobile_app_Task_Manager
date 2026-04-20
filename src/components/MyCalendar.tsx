import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
// Βεβαιώσου ότι το path για τα styles είναι σωστό
import { calendarStyles as styles } from '../assets/styles/calendarStyles';

// 1. Ορίζουμε το Interface για τα props
interface MyCalendarProps {
  onDateSelect: (date: string) => void;
}

// 2. Χρησιμοποιούμε το React.FC (Functional Component) με το Interface
const MyCalendar: React.FC<MyCalendarProps> = ({ onDateSelect }) => {
  const [viewDate, setViewDate] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Ορίζουμε τον τύπο του offset ως number
  const changeMonth = (offset: number) => {
    const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
    setViewDate(newDate);
  };

  const generateDays = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: { id: string; day: number | null }[] = [];
    
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ id: `empty-${i}`, day: null });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ id: `${year}-${month + 1}-${i}`, day: i });
    }
    return days;
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => changeMonth(-1)}>
          <Ionicons name="chevron-back" size={24} color="#0066FF" />
        </TouchableOpacity>
        
        <Text style={styles.monthHeader}>
          {viewDate.toLocaleString('default', { month: 'long' })} {viewDate.getFullYear()}
        </Text>

        <TouchableOpacity onPress={() => changeMonth(1)}>
          <Ionicons name="chevron-forward" size={24} color="#0066FF" />
        </TouchableOpacity>
      </View>

      <View style={styles.weekRow}>
        {daysOfWeek.map(d => <Text key={d} style={styles.weekText}>{d}</Text>)}
      </View>

      <FlatList
        data={generateDays()}
        numColumns={7}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        renderItem={({ item }) => (
          item.day ? (
            <TouchableOpacity 
              style={styles.dayBox} 
              onPress={() => onDateSelect(item.id)}
            >
              <Text style={styles.dayText}>{item.day}</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.emptyBox} />
          )
        )}
      />
    </View>
  );
};

export default MyCalendar;