import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface IssueCategory {
  id: string;
  name: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

const ISSUE_CATEGORIES: IssueCategory[] = [
  { id: "1", name: "Pothole", icon: "location-on" },
  { id: "2", name: "Streetlight", icon: "light-mode" },
  { id: "3", name: "Garbage", icon: "delete" },
  { id: "4", name: "Water Leakage", icon: "water-drop" },
  { id: "5", name: "Roadblock", icon: "block" },
  { id: "6", name: "Other", icon: "more-horiz" },
];

const Report = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const handleCaptureImage = () => {
    // Handle image capture logic here
    console.log("Capture image");
  };

  const handleReportIssue = () => {
    if (!selectedCategory) {
      console.log("Please select a category");
      return;
    }
    console.log("Reporting issue with category:", selectedCategory);
  };

  return (
    <SafeAreaView  style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <MaterialIcons name="location-on" size={24} color="#fff" />
          <Text style={styles.headerTitle}>Report Civic Issue</Text>
          <View style={styles.headerIcon}>
            <MaterialIcons name="notifications" size={24} color="#fff" />
          </View>
        </View>
      </View>

      {/* Location Selector */}
      {/* <View style={styles.locationSection}>
        <View style={styles.locationItem}>
          <MaterialIcons name="location-on" size={18} color="#007AFF" />
          <Text style={styles.locationText}>Current Location</Text>
          <Text style={styles.cityText}>In City Name</Text>
        </View>
        <Pressable style={styles.dropdownButton}>
          <MaterialIcons name="expand-more" size={24} color="#666" />
        </Pressable>
      </View> */}

      {/* Map Placeholder */}
      <View style={styles.mapPlaceholder}>
        <MaterialIcons name="map" size={64} color="#ccc" />
        <Text style={styles.mapPlaceholderText}>Map view will be added here</Text>
      </View>

      {/* Capture Issue Section */}
      <View style={styles.captureSection}>
        <Pressable
          style={styles.captureButton}
          onPress={handleCaptureImage}
        >
          <MaterialIcons name="camera-alt" size={20} color="#007AFF" />
          <Text style={styles.captureButtonText}>Capture Issue</Text>
        </Pressable>

        {capturedImage && (
          <Image source={{ uri: capturedImage }} style={styles.capturedImage} />
        )}
      </View>

      {/* Category Selection */}
      <View style={styles.categorySection}>
        <Text style={styles.categoryTitle}>Select Issue Category</Text>
        <View style={styles.categoryGrid}>
          {ISSUE_CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[
                styles.categoryCard,
                selectedCategory === category.id &&
                  styles.categoryCardSelected,
              ]}
            >
              <View
                style={[
                  styles.categoryIconContainer,
                  selectedCategory === category.id &&
                    styles.categoryIconContainerSelected,
                ]}
              >
                <MaterialIcons
                  name={category.icon}
                  size={32}
                  color={
                    selectedCategory === category.id ? "#fff" : "#007AFF"
                  }
                />
              </View>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category.id &&
                    styles.categoryNameSelected,
                ]}
              >
                {category.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Report Button */}
      <Pressable
        style={({ pressed }) => [
          styles.reportButton,
          pressed && styles.reportButtonPressed,
        ]}
        onPress={handleReportIssue}
      >
        <Text style={styles.reportButtonText}>Report Issue</Text>
      </Pressable>

      <View style={styles.spacer} />
    </SafeAreaView>
  );
};

export default Report;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#007AFF",
    paddingTop: 12,
    paddingBottom: 16,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
    marginLeft: 12,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  locationSection: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 8,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  locationItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  locationText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  cityText: {
    fontSize: 12,
    color: "#999",
    marginLeft: 4,
  },
  dropdownButton: {
    padding: 8,
  },
  mapPlaceholder: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 8,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  mapPlaceholderText: {
    fontSize: 14,
    color: "#999",
    marginTop: 12,
  },
  captureSection: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  captureButton: {
    backgroundColor: "#f0f7ff",
    borderRadius: 8,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  captureButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
  },
  capturedImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginTop: 12,
  },
  categorySection: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    width: "30%",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    backgroundColor: "#f9f9f9",
    marginBottom: 10,
  },
  categoryCardSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  categoryIconContainer: {
    width: 43,
    height: 43,
    borderRadius: 28,
    backgroundColor: "#f0f7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryIconContainerSelected: {
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "500",
    color: "#333",
    textAlign: "center",
  },
  categoryNameSelected: {
    color: "#fff",
    fontWeight: "600",
  },
  reportButton: {
    backgroundColor: "#007AFF",
    marginHorizontal: 15,
    marginVertical: 12,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  reportButtonPressed: {
    backgroundColor: "#0056cc",
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  spacer: {
    height: 20,
  },
});
