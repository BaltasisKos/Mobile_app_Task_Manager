import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

import { styles } from "../../src/assets/styles/loginStyles";

// Παίρνουμε το πλάτος της οθόνης για να κάνουμε το design να δείχνει ωραίο
const { width } = Dimensions.get("window");

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
        {/* 2. Ο Τίτλος */}
        <View style={styles.textSection}>
          <Text style={styles.mainTitle}>Task Manager</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              Manage all your tasks in one place!
            </Text>
          </View>
        </View>

        {/* 3. Το Λευκό Κουτί (Κάρτα - Δεξιά) */}
        <View style={styles.card}>
          <Text style={styles.cardHeader}>
            {isLogin ? "Welcome Back!" : "Sign Up"}
          </Text>

          {/* Κουμπιά εναλλαγής (Login / Signup) */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={styles.toggleBtn}
              onPress={() => setIsLogin(true)}
            >
              {isLogin ? (
                <LinearGradient
                  colors={["#0066FF", "#00D4FF"]}
                  style={styles.activeGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.activeText}>Login</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.inactiveText}>Login</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.toggleBtn}
              onPress={() => setIsLogin(false)}
            >
              {!isLogin ? (
                <LinearGradient
                  colors={["#0066FF", "#00D4FF"]}
                  style={styles.activeGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Text style={styles.activeText}>Signup</Text>
                </LinearGradient>
              ) : (
                <Text style={styles.inactiveText}>Signup</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Πεδία Φόρμας (Inputs) */}
          {!isLogin && (
            <TextInput
              placeholder="Name"
              style={styles.input}
              placeholderTextColor="#999"
            />
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
              colors={["#0066FF", "#00D4FF"]}
              style={styles.gradientSubmit}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.submitText}>
                {isLogin ? "Login" : "Signup"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Κείμενο στο τέλος */}
          <Text style={styles.footerText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Text style={styles.linkText} onPress={() => setIsLogin(!isLogin)}>
              {isLogin ? "Signup now" : "Login"}
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
