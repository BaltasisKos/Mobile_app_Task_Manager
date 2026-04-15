// assets/loginStyles.js
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: { flex: 1 },
  bgImage: { flex: 1, resizeMode: "cover" },
  content: {
    flex: 1,
    flexDirection: width > 768 ? "row" : "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
  },
  textSection: { alignItems: "center" },
  mainTitle: { fontSize: 48, fontWeight: "bold", color: "#0066FF" },
  badge: {
    borderWidth: 1,
    borderColor: "#0066FF",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
  },
  badgeText: { color: "#0066FF", fontSize: 14 },
  card: {
    width: width > 768 ? 400 : "100%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardHeader: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
  },
  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#F0F0F0",
    borderRadius: 30,
    marginBottom: 25,
    height: 45,
  },
  toggleBtn: { flex: 1, justifyContent: "center", alignItems: "center" },
  activeGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  activeText: { color: "white", fontWeight: "bold" },
  inactiveText: { color: "#666", fontWeight: "bold" },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    marginBottom: 20,
    paddingVertical: 8,
    fontSize: 16,
  },
  forgotText: {
    color: "#00D4FF",
    textAlign: "right",
    fontSize: 14,
    marginBottom: 20,
  },
  submitBtn: { width: "100%", marginTop: 10 },
  gradientSubmit: {
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  submitText: { color: "white", fontWeight: "bold", fontSize: 16 },
  footerText: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
    fontSize: 14,
  },
  linkText: { color: "#00D4FF", fontWeight: "bold" },
});