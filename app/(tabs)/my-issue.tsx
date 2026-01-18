import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

interface Issue {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "critical";
  createdDate: string;
  category: string;
}

const mockIssues: Issue[] = [
  {
    id: "1",
    title: "App crashes on startup",
    description: "The application crashes immediately when opened on iOS",
    status: "open",
    priority: "critical",
    createdDate: "2024-01-15",
    category: "Bug",
  },
  {
    id: "2",
    title: "Login page not responding",
    description: "Login button does not respond to clicks",
    status: "in-progress",
    priority: "high",
    createdDate: "2024-01-14",
    category: "Bug",
  },
  {
    id: "3",
    title: "Add dark mode support",
    description: "Implement dark mode theme across the application",
    status: "in-progress",
    priority: "medium",
    createdDate: "2024-01-13",
    category: "Feature",
  },
  {
    id: "4",
    title: "Improve loading speed",
    description: "Optimize API calls and reduce initial load time",
    status: "resolved",
    priority: "medium",
    createdDate: "2024-01-12",
    category: "Performance",
  },
  {
    id: "5",
    title: "Fix typo in settings page",
    description: "Typo in the privacy section",
    status: "closed",
    priority: "low",
    createdDate: "2024-01-11",
    category: "Bug",
  },
  {
    id: "6",
    title: "Database connection timeout",
    description: "API requests timing out after 30 seconds",
    status: "open",
    priority: "high",
    createdDate: "2024-01-10",
    category: "Bug",
  },
];

type SortOption = "date-desc" | "date-asc" | "priority-high" | "priority-low";
type StatusFilter = "all" | "open" | "in-progress" | "resolved" | "closed";

const MyIssues = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("date-desc");

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = mockIssues.filter((issue) => {
      const matchesSearch =
        issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        issue.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || issue.status === statusFilter;
      return matchesSearch && matchesStatus;
    });

    // Sort issues
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return (
            new Date(b.createdDate).getTime() -
            new Date(a.createdDate).getTime()
          );
        case "date-asc":
          return (
            new Date(a.createdDate).getTime() -
            new Date(b.createdDate).getTime()
          );
        case "priority-high": {
          const priorityMap = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityMap[b.priority] - priorityMap[a.priority];
        }
        case "priority-low": {
          const priorityMap = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityMap[a.priority] - priorityMap[b.priority];
        }
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, statusFilter, sortBy]);

  const getStatusColor = (status: Issue["status"]) => {
    switch (status) {
      case "open":
        return "#ff6b6b";
      case "in-progress":
        return "#ffc107";
      case "resolved":
        return "#4caf50";
      case "closed":
        return "#999";
      default:
        return "#666";
    }
  };

  const getPriorityColor = (priority: Issue["priority"]) => {
    switch (priority) {
      case "critical":
        return "#ff0000";
      case "high":
        return "#ff6b6b";
      case "medium":
        return "#ffc107";
      case "low":
        return "#4caf50";
      default:
        return "#666";
    }
  };

  const renderIssueCard = ({ item }: { item: Issue }) => (
    <Pressable
      onPress={() =>
        router.push({
          pathname: "/issue-detail",
          params: { issueId: item.id, issueData: JSON.stringify(item) },
        })
      }
      style={({ pressed }) => [
        styles.issueCard,
        pressed && styles.issueCardPressed,
      ]}
    >
      <View style={styles.issueHeader}>
        <Text style={styles.issueTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.statusBadge}>
          <Text
            style={[styles.statusText, { color: getStatusColor(item.status) }]}
          >
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <Text style={styles.issueDescription} numberOfLines={2}>
        {item.description}
      </Text>

      <View style={styles.issueFooter}>
        <View style={styles.badgeContainer}>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(item.priority) },
            ]}
          >
            <Text style={styles.priorityText}>
              {item.priority.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
        <Text style={styles.dateText}>{item.createdDate}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Issues</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <MaterialIcons
          name="search"
          size={20}
          color="#999"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search issues..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {/* Filter and Sort Controls */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.controlsSection}
        contentContainerStyle={styles.controlsContent}
      >
        {/* Status Filter */}
        {(
          ["all", "open", "in-progress", "resolved", "closed"] as StatusFilter[]
        ).map((filter) => (
          <Pressable
            key={filter}
            onPress={() => setStatusFilter(filter)}
            style={[
              styles.filterButton,
              statusFilter === filter && styles.filterButtonActive,
            ]}
          >
            <Text
              style={[
                styles.filterButtonText,
                statusFilter === filter && styles.filterButtonTextActive,
              ]}
            >
              {filter.charAt(0).toUpperCase() +
                filter.slice(1).replace("-", " ")}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Sort Options */}
      <View style={styles.sortSection}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.sortButtons}
        >
          <Pressable
            onPress={() => setSortBy("date-desc")}
            style={[
              styles.sortButton,
              sortBy === "date-desc" && styles.sortButtonActive,
            ]}
          >
            <MaterialIcons
              name="arrow-downward"
              size={16}
              color={sortBy === "date-desc" ? "#fff" : "#666"}
            />
            <Text
              style={[
                styles.sortButtonText,
                sortBy === "date-desc" && styles.sortButtonTextActive,
              ]}
            >
              Newest
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSortBy("date-asc")}
            style={[
              styles.sortButton,
              sortBy === "date-asc" && styles.sortButtonActive,
            ]}
          >
            <MaterialIcons
              name="arrow-upward"
              size={16}
              color={sortBy === "date-asc" ? "#fff" : "#666"}
            />
            <Text
              style={[
                styles.sortButtonText,
                sortBy === "date-asc" && styles.sortButtonTextActive,
              ]}
            >
              Oldest
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSortBy("priority-high")}
            style={[
              styles.sortButton,
              sortBy === "priority-high" && styles.sortButtonActive,
            ]}
          >
            <MaterialIcons
              name="trending-up"
              size={16}
              color={sortBy === "priority-high" ? "#fff" : "#666"}
            />
            <Text
              style={[
                styles.sortButtonText,
                sortBy === "priority-high" && styles.sortButtonTextActive,
              ]}
            >
              High Priority
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setSortBy("priority-low")}
            style={[
              styles.sortButton,
              sortBy === "priority-low" && styles.sortButtonActive,
            ]}
          >
            <MaterialIcons
              name="trending-down"
              size={16}
              color={sortBy === "priority-low" ? "#fff" : "#666"}
            />
            <Text
              style={[
                styles.sortButtonText,
                sortBy === "priority-low" && styles.sortButtonTextActive,
              ]}
            >
              Low Priority
            </Text>
          </Pressable>
        </ScrollView>
      </View>

      {/* Issues List */}
      {filteredAndSortedIssues.length > 0 ? (
        <FlatList
          data={filteredAndSortedIssues}
          renderItem={renderIssueCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          scrollEnabled={true}
        />
      ) : (
        <View style={styles.emptyState}>
          <MaterialIcons name="inbox" size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>No issues found</Text>
          <Text style={styles.emptyStateSubtext}>
            Try adjusting your filters or search query
          </Text>
        </View>
      )}
    </View>
  );
};

export default MyIssues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  searchSection: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    marginVertical: 12,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
  },
  controlsSection: {
    backgroundColor: "#fff",
    marginBottom: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  controlsContent: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  filterButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  filterButtonText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  filterButtonTextActive: {
    color: "#fff",
  },
  sortSection: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  sortLabel: {
    fontSize: 12,
    color: "#999",
    fontWeight: "600",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  sortButtons: {
    gap: 8,
    paddingBottom: 5,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    gap: 4,
  },
  sortButtonActive: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  sortButtonText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  sortButtonTextActive: {
    color: "#fff",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  issueCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#007AFF",
  },
  issueCardPressed: {
    backgroundColor: "#f5f5f5",
  },
  issueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 10,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "600",
  },
  issueDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 10,
    lineHeight: 18,
  },
  issueFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priorityBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  priorityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  categoryText: {
    fontSize: 11,
    color: "#999",
    fontWeight: "500",
  },
  dateText: {
    fontSize: 11,
    color: "#999",
  },
  emptyState: {
    paddingVertical: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#999",
    marginTop: 10,
    fontWeight: "600",
  },
  emptyStateSubtext: {
    fontSize: 13,
    color: "#bbb",
    marginTop: 5,
  },
});
