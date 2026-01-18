import { Link } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TextInputField from "../components/text-input-field";

const Index: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.appName}>Civic Report</Text>
        </View>

        {/* Card Container */}
        <View style={styles.cardContainer}>
          {/* Heading */}
          <Text style={styles.heading}>Login to your account</Text>

          {/* Form Section */}
          <View style={styles.formSection}>
            {/* Email Input */}
            <TextInputField
              label="Email"
              placeholder="joedoe75@gmail.com"
              icon="email"
              keyboardType="email-address"
            />

            {/* Password Input */}
            <TextInputField
              label="Password"
              placeholder="••••••••"
              icon="lock"
              secureTextEntry
            />

            {/* Login Button */}
            <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>

              <Link href={"/signup"} asChild>
                <TouchableOpacity>
                  <Text style={styles.signupLink}>Sign up</Text>
                </TouchableOpacity>
              </Link>
            </View>

            {/* --- MODIFIED: Subtle Centralized Home Button --- */}
            <View style={styles.homeButtonContainer}>
              <Link href={"/(tabs)/report"} asChild>
                <TouchableOpacity style={styles.homeButton}>
                  <Text style={styles.homeButtonText}>Home</Text>
                </TouchableOpacity>
              </Link>
            </View>
            {/* ------------------------------------------------ */}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  content: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: "center",
    marginBottom: 24,
    paddingTop: 140,
  },
  appName: {
    fontSize: 38,
    fontWeight: "700",
    color: "#2563EB",
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  heading: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 28,
    textAlign: "center",
  },
  formSection: {
    gap: 0,
  },
  loginButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 13,
    color: "#64748B",
  },
  signupLink: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
  },
 
  homeButtonContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  homeButton: {
    backgroundColor: "#F8FAFC", 
    borderWidth: 1,
    borderColor: "#E2E8F0", 
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  homeButtonText: {
    color: "#64748B", 
    fontSize: 14,
    fontWeight: "600",
  },
});
