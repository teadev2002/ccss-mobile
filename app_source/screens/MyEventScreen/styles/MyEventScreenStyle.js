import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  header: {
    height: 40,
    backgroundColor: "#510545",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    elevation: 4,
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
  heroSection: {
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: "800",
    textTransform: "uppercase",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    marginBottom: 12,
    textAlign: "center",
  },
   actionButton: {
    flexBasis: "48%", // 2 nút mỗi hàng (2x2)
    marginBottom: 8,   // khoảng cách giữa các hàng
  },
heroSection: {
    paddingVertical: 20,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  searchBox: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    margin: 16,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 16,
    marginBottom: 10,
    gap: 6,
    justifyContent: "space-between",
  },
  tabButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#ddd",
    flexGrow: 1,
    alignItems: "center",
    margin: 2,
  },
  activeTabButton: { backgroundColor: "#22668a" },
  tabText: { color: "#000", fontSize: 12 },
  activeTabText: { color: "#fff" },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    justifyContent: "center",
  },
  eventCard: {
    backgroundColor: "#fffff0",
    borderRadius: 10,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  eventTitle: { fontWeight: "bold", fontSize: 16, flex: 1 },
  statusChip: {
    backgroundColor: "#1e90ff",
    color: "#fff",
    height: 35,
  },
  eventText: { fontSize: 14, marginBottom: 2 },
  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8, 
  },
});

export default styles;