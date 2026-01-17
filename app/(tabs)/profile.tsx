import React, { useState } from "react";
import {
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

const Profile = () => {
  const [userProfile] = useState({
    name: "Swayam Kandarkar",
    email: "Swayam@example.com",
    phone: "+91 9990909090",
    avatar: "https://via.placeholder.com/120",
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header with Avatar and Basic Info */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: userProfile.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{userProfile.name}</Text>
        <Text style={styles.email}>{userProfile.email}</Text>
      </View>

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{userProfile.email}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{userProfile.phone}</Text>
        </View>
      </View>

      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <Text style={styles.menuItemText}>Edit Profile</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <Text style={styles.menuItemText}>Change Password</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <Text style={styles.menuItemText}>Settings</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </Pressable>
      </View>

      {/* Additional Options */}
      <View style={styles.section}>
        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <Text style={styles.menuItemText}>Privacy & Security</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <Text style={styles.menuItemText}>Help & Support</Text>
          <Text style={styles.menuItemArrow}>›</Text>
        </Pressable>
      </View>

      {/* Logout Button */}
      <Pressable style={styles.logoutButton}>
        <Text style={styles.logoutText}>Logout</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingTop: 20,
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    backgroundColor: "#e0e0e0",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    backgroundColor: "#fff",
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#999",
    paddingHorizontal: 20,
    paddingVertical: 10,
    textTransform: "uppercase",
  },
  infoItem: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  label: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
    textTransform: "uppercase",
    fontWeight: "500",
  },
  value: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
  },
  menuItemPressed: {
    backgroundColor: "#f5f5f5",
  },
  menuItemText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  menuItemArrow: {
    fontSize: 24,
    color: "#999",
  },
  logoutButton: {
    backgroundColor: "#ff4444",
    marginHorizontal: 20,
    marginVertical: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
