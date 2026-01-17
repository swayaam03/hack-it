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

const Signup: React.FC = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.appName}>Civic Report</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Card */}
        <View style={styles.cardContainer}>
          <Text style={styles.heading}>Create an Account?</Text>

          <View style={styles.formSection}>
            {/* Name */}
            <TextInputField
              label="Name"
              placeholder="Johan orindo"
              icon="person"
            />

            {/* Email */}
            <TextInputField
              label="Email"
              placeholder="joedoe75@gmail.com"
              icon="email"
              keyboardType="email-address"
            />

            {/* Phone Number */}
            <TextInputField
              label="Phone Number"
              placeholder="+91"
              icon="phone"
              keyboardType="phone-pad"
            />

            {/* Password */}
            <TextInputField
              label="Password"
              placeholder="••••••••"
              icon="lock"
              secureTextEntry
            />

            {/* Create Account Button */}
            <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}>
              <Text style={styles.signupButtonText}>Create account</Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>

              <Link href="/" asChild>
                <TouchableOpacity>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffdfd",
  },
  content: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  appName: {
    fontSize: 38,
    fontWeight: "700",
    color: "#2563EB",
    paddingTop: 75,
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
  signupButton: {
    backgroundColor: "#2563EB",
    paddingVertical: 12,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 8,
  },
  signupButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  loginText: {
    fontSize: 13,
    color: "#64748B",
  },
  loginLink: {
    fontSize: 13,
    color: "#2563EB",
    fontWeight: "600",
  },
});
