import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#4F46E5",
  secondary: "#6B7280",
  accent: "#10B981",
  background: "#F9FAFB",
  card: "#FFFFFF",
  text: "#1F2937",
  textSecondary: "#6B7280",
  error: "#EF4444",
  warning: "#FBBF24",
  success: "#10B981",
};

const TYPOGRAPHY = {
  title: { fontSize: 24, fontWeight: "bold", color: COLORS.text },
  subtitle: { fontSize: 18, fontWeight: "600", color: COLORS.text },
  body: { fontSize: 16, color: COLORS.text },
  caption: { fontSize: 14, color: COLORS.textSecondary },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  header: {
    ...TYPOGRAPHY.title,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: COLORS.text,
  },
  sortRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pickerContainer: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  picker: {
    height: 48,
    color: COLORS.text,
  },
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
  },
  tabText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text,
  },
  activeTabText: {
    color: "#fff",
    fontWeight: "600",
  },
  statusFilters: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  statusBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statusBtnActive: {
    backgroundColor: COLORS.primary,
  },
  statusText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text,
  },
  statusTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },

  cardTitle: {
    ...TYPOGRAPHY.subtitle,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  statusBadgeText: {
    ...TYPOGRAPHY.caption,
    fontWeight: "600",
  },
  cardText: {
    ...TYPOGRAPHY.body,
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cancelButton: {
    backgroundColor: "#FEE2E2",
  },
  actionButtonText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.primary,
    marginLeft: 4,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  loadingText: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: 8,
  },
});

export default styles;
