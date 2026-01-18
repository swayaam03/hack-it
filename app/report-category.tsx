import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const ReportCategory = () => {
  const router = useRouter();
  const { categoryId, categoryName } = useLocalSearchParams();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const handleCaptureImage = async () => {
    // Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        "Camera permission is required to take photos. Please enable it in your device settings.",
        [{ text: "OK" }]
      );
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  const handleSubmitReport = () => {
    console.log("Submitting report for:", categoryName);
    console.log("Description:", description);
    console.log("Location:", location);
    router.back();
  };

  const getCategoryIcon = (
    category: string,
  ): keyof typeof MaterialIcons.glyphMap => {
    const iconMap: Record<string, keyof typeof MaterialIcons.glyphMap> = {
      Pothole: "location-on",
      Streetlight: "light-mode",
      Garbage: "delete",
      "Water Leakage": "water-drop",
      Roadblock: "block",
      Other: "more-horiz",
    };
    return iconMap[category as string] || "location-on";
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Category Header */}
      <View style={styles.categoryHeader}>
        <View style={styles.headerContent}>
          <MaterialIcons
            name={getCategoryIcon(categoryName as string)}
            size={32}
            color="#fff"
          />
          <Text style={styles.categoryTitle}>{categoryName}</Text>
        </View>
      </View>

      {/* Image Capture Section */}
      <View style={styles.imageSection}>
        <Text style={styles.sectionTitle}>Capture Photo</Text>
        {capturedImage ? (
          <View>
            <Image
              source={{ uri: capturedImage }}
              style={styles.capturedImage}
            />
            <Pressable
              style={styles.recaptureButton}
              onPress={handleCaptureImage}
            >
              <MaterialIcons name="refresh" size={20} color="#007AFF" />
              <Text style={styles.recaptureButtonText}>Retake Photo</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.captureButton} onPress={handleCaptureImage}>
            <MaterialIcons name="camera-alt" size={48} color="#007AFF" />
            <Text style={styles.captureButtonText}>Take Photo</Text>
            <Text style={styles.captureSubtext}>Tap to capture the issue</Text>
          </Pressable>
        )}
      </View>

      {/* Location Section */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Location Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location or address"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
        />
      </View>

      {/* Description Section */}
      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.formLabel}>
          Provide details about the {categoryName?.toString().toLowerCase()}
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe the issue in detail..."
          placeholderTextColor="#999"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />
      </View>

      {/* Additional Info */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Report Information</Text>
        <View style={styles.infoItem}>
          <MaterialIcons name="info" size={20} color="#007AFF" />
          <Text style={styles.infoText}>
            Please provide accurate details to help us address the issue quickly
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.buttonSection}>
        <Pressable style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.submitButtonPressed,
          ]}
          onPress={handleSubmitReport}
        >
          <MaterialIcons name="check-circle" size={20} color="#fff" />
          <Text style={styles.submitButtonText}>Submit Report</Text>
        </Pressable>
      </View>

      <View style={styles.spacer} />
    </ScrollView>
  );
};

export default ReportCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  categoryHeader: {
    backgroundColor: "#007AFF",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
    flex: 1,
  },
  imageSection: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  captureButton: {
    borderWidth: 2,
    borderColor: "#007AFF",
    borderStyle: "dashed",
    borderRadius: 8,
    padding: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f7ff",
  },
  captureButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginTop: 12,
  },
  captureSubtext: {
    fontSize: 13,
    color: "#999",
    marginTop: 5,
  },
  capturedImage: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    marginBottom: 12,
  },
  recaptureButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 10,
    gap: 6,
    backgroundColor: "#f0f7ff",
  },
  recaptureButtonText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
  },
  formSection: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  formLabel: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#f9f9f9",
  },
  textArea: {
    paddingTop: 10,
    textAlignVertical: "top",
    minHeight: 120,
  },
  infoSection: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 8,
    padding: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  infoText: {
    fontSize: 13,
    color: "#666",
    flex: 1,
    lineHeight: 20,
  },
  buttonSection: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  cancelButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  submitButtonPressed: {
    backgroundColor: "#0056cc",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  spacer: {
    height: 20,
  },
});
