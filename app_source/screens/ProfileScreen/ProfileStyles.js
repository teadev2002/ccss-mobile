import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff", // $bg-dark
  },
  header: {
    height: 60,
    backgroundColor: "#510545",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  backButton: {
    padding: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textTransform: "uppercase",
    marginLeft: 10,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    flexDirection: "row",
    marginBottom: 20,
  },
  profileImageContainer: {
    alignItems: "center",
    marginRight: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  editButton: {
    marginTop: 10,
    backgroundColor: "#363636", // $button-bg
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "500",
  },
  profileInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#080808", // $text-light
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#a8a8a8", // $text-secondary
    marginBottom: 10,
  },
  statusBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  statusBadge: {
    borderRadius: 16,
  },
  activeBadge: {
    backgroundColor: "#00875a",
  },
  onTaskBadge: {
    backgroundColor: "#0052cc",
  },
  leaderBadge: {
    backgroundColor: "#ff991f",
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 10,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    width: "48%", // 2 cột
  },
  detailText: {
    fontSize: 11,
    color: "#a8a8a8", // $text-secondary
  },
  tabs: {
    // flexDirection: "row",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#262626", // $border-color
    marginTop: 20,
  },
  tab: {
    paddingVertical: 10,
  },
  tabText: {
    textTransform: "uppercase",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
    color: "#a8a8a8", // $text-secondary
  },
  activeTab: {
    color: "#080808", // $text-light
    // borderTopWidth: 1,
    borderTopColor: "#080808", // $text-light
    marginTop: 9,
  },
  emptyState: {
    marginTop: 20,
    padding: 20,
    alignItems: "center",
  },
  emptyStateContent: {
    alignItems: "center",
  },
  cameraIcon: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#080808", // $text-light
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  emptyStateTitle: {
    fontSize: 24,
    color: "#080808", // $text-light
    marginBottom: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#a8a8a8", // $text-secondary
    textAlign: "center",
    marginBottom: 10,
  },
  shareButton: {
    color: "#0095f6", // $link-color
    fontWeight: "500",
  },
});
