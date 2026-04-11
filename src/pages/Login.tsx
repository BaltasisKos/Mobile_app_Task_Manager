import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, TextInput, TouchableOpacity, 
  ImageBackground, Dimensions, KeyboardAvoidingView, Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from "expo-router";

// Παίρνουμε το πλάτος της οθόνης για να κάνουμε το design να δείχνει ωραίο
const { width } = Dimensions.get('window');



export default function LoginScreen() {
  // Αυτό ελέγχει αν βλέπουμε τη φόρμα Login ή τη φόρμα Signup
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter(); // 2. Και γι' αυτό

  const handleLogin = () => {
    // 3. Η εντολή που σε μεταφέρει στο Home
    router.replace("/tabs/home"); 
  };

  return (
    <View style={styles.container}>
      {/* 1. Το Background (Φόντο) */}

        <KeyboardAvoidingView 
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.content}
        >
          
          {/* 2. Ο Τίτλος (Αριστερά) */}
          <View style={styles.textSection}>
            <Text style={styles.mainTitle}>Task Manager</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Manage all your tasks in one place!</Text>
            </View>
          </View>

          {/* 3. Το Λευκό Κουτί (Κάρτα - Δεξιά) */}
          <View style={styles.card}>
            <Text style={styles.cardHeader}>
              {isLogin ? 'Welcome Back!' : 'Sign Up'}
            </Text>

            {/* Κουμπιά εναλλαγής (Login / Signup) */}
            <View style={styles.toggleContainer}>
              <TouchableOpacity style={styles.toggleBtn} onPress={() => setIsLogin(true)}>
                {isLogin ? (
                  <LinearGradient colors={['#0066FF', '#00D4FF']} style={styles.activeGradient} start={{x:0, y:0}} end={{x:1, y:0}}>
                    <Text style={styles.activeText}>Login</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.inactiveText}>Login</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity style={styles.toggleBtn} onPress={() => setIsLogin(false)}>
                {!isLogin ? (
                  <LinearGradient colors={['#0066FF', '#00D4FF']} style={styles.activeGradient} start={{x:0, y:0}} end={{x:1, y:0}}>
                    <Text style={styles.activeText}>Signup</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.inactiveText}>Signup</Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Πεδία Φόρμας (Inputs) */}
            {!isLogin && (
              <TextInput placeholder="Name" style={styles.input} placeholderTextColor="#999" />
            )}
            
            <TextInput 
              placeholder="Email Address" 
              style={styles.input} 
              keyboardType="email-address" 
              placeholderTextColor="#999" 
            />
            
            <TextInput 
              placeholder="Password" 
              style={styles.input} 
              secureTextEntry 
              placeholderTextColor="#999" 
            />
            
            {!isLogin && (
              <TextInput 
                placeholder="Confirm Password" 
                style={styles.input} 
                secureTextEntry 
                placeholderTextColor="#999" 
              />
            )}

            {/* Forgot Password (Φαίνεται μόνο στο Login) */}
            {isLogin && (
              <TouchableOpacity>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>
            )}

            {/* Το μεγάλο μπλε κουμπί Submit */}
            <TouchableOpacity onPress={handleLogin} style={styles.submitBtn}>
              <LinearGradient 
                colors={['#0066FF', '#00D4FF']} 
                style={styles.gradientSubmit}
                start={{x:0, y:0}} end={{x:1, y:0}}
              >
                <Text style={styles.submitText}>
                  {isLogin ? 'Login' : 'Signup'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Κείμενο στο τέλος */}
            <Text style={styles.footerText}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <Text style={styles.linkText} onPress={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Signup now' : 'Login'}
              </Text>
            </Text>
            
          </View>
        </KeyboardAvoidingView>
    </View>
  );
}

// === Εδώ είναι η εμφάνιση (Styling) ===
const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: { flex: 1, resizeMode: 'cover' },
  content: { 
    flex: 1, 
    flexDirection: width > 768 ? 'row' : 'column', // Για να φαίνεται καλά και σε web και σε κινητό
    alignItems: 'center', 
    justifyContent: 'space-evenly',
    padding: 20 
  },
  
  textSection: { alignItems: 'center' },
  mainTitle: { fontSize: 48, fontWeight: 'bold', color: '#00D4FF' },
  badge: { 
    borderWidth: 1, borderColor: '#00D4FF', borderRadius: 20, 
    paddingHorizontal: 15, paddingVertical: 5, marginTop: 10 
  },
  badgeText: { color: '#00D4FF', fontSize: 14 },

  card: { 
    width: width > 768 ? 400 : '100%', // Πλάτος κάρτας
    backgroundColor: 'white', 
    borderRadius: 20, 
    padding: 30,
    elevation: 5, // Σκιά για Android
    shadowColor: '#000', // Σκιά για iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 25 },
  
  toggleContainer: { 
    flexDirection: 'row', backgroundColor: '#F0F0F0', 
    borderRadius: 30, marginBottom: 25, height: 45
  },
  toggleBtn: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  activeGradient: { width: '100%', height: '100%', borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  activeText: { color: 'white', fontWeight: 'bold' },
  inactiveText: { color: '#666', fontWeight: 'bold' },
  
  input: { borderBottomWidth: 1, borderBottomColor: '#E0E0E0', marginBottom: 20, paddingVertical: 8, fontSize: 16 },
  forgotText: { color: '#00D4FF', textAlign: 'right', fontSize: 14, marginBottom: 20 },
  
  submitBtn: { width: '100%', marginTop: 10 },
  gradientSubmit: { borderRadius: 30, paddingVertical: 15, alignItems: 'center' },
  submitText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  
  footerText: { textAlign: 'center', marginTop: 20, color: '#666', fontSize: 14 },
  linkText: { color: '#00D4FF', fontWeight: 'bold' }
});