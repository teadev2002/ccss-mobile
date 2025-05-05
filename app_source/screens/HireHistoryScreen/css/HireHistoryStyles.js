import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fb",
  },
  header: {
    height: 60,
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

  actionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // ✅ căn giữa đều
    alignItems: "center",
    marginVertical: 8,
    gap: 8, // nếu bạn dùng RN >= 0.71, còn không thì dùng margin như dưới
  },

  actionButton: {
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 4, // thay cho gap
    marginVertical: 4,
  },

  actionText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },

  heroSubtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    maxWidth: 300,
  },

  filterRow: {
    marginTop: 15,
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#22668a",
  },
  filterButtonActive: {
    backgroundColor: "#22668a",
  },
  filterButtonText: {
    fontWeight: "600",
    color: "#22668a",
  },
  filterButtonTextActive: {
    color: "#fff",
  },

  content: {
    flex: 1,
    padding: 20,
  },

  requestContainer: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  requestTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#22668a",
    marginBottom: 8,
  },
  dateRange: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  cardText: {
    fontSize: 14,
    color: "#444",
    marginBottom: 3,
  },
  cardTextHighlight: {
    fontSize: 14,
    color: "#d94343",
    fontWeight: "700",
    marginBottom: 3,
  },

  viewDetailBtn: {
    marginTop: 8,
    textAlign: "right",
    color: "#22668a",
    fontWeight: "600",
  },

  infoCard: {
    marginTop: 10,
    marginBottom: 10,
    elevation: 2,
    borderRadius: 12,
    backgroundColor: "#fefefe",
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  characterImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#eee",
  },
  cardContent: {
    flex: 1,
  },
  characterName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },

  feedbackBtn: {
    marginTop: 12,
    backgroundColor: "#FF914D",
    borderRadius: 8,
  },
  changeBtn: {
    color: "#FF914D",
    fontWeight: "600",
    marginLeft: 10,
  },

  fakeCosItem: {
    padding: 12,
    backgroundColor: "#f3f3f3",
    borderRadius: 8,
    marginBottom: 8,
  },

  editBtn: {
    marginTop: 5,
    alignSelf: "flex-end",
  },

  editBtnText: {
    color: "#0077cc",
    fontWeight: "600",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    zIndex: 99,
  },

  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    width: "100%",
    maxHeight: "85%",
    maxWidth: 350,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },

  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 12,
    fontSize: 14,
  },

  paymentButtonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  contractInfo: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  contractTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
  },
  contractDetails: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  paymentButtonRow: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    marginVertical: 16,
    gap: 10,
  },
  flexBtn: {
    flex: 1,
    marginHorizontal: 6,
  },
  statusTagCreated: {
    color: "#888", // xám nhạt
    fontWeight: "bold",
  },

  statusTagDeposited: {
    color: "#1e90ff", // xanh dương
    fontWeight: "bold",
  },

  statusTagFinal: {
    color: "#20c997", // xanh ngọc
    fontWeight: "bold",
  },

  statusTagComplete: {
    color: "#28a745", // xanh lá
    fontWeight: "bold",
  },

  statusTagFeedbacked: {
    color: "#8e44ad", // tím
    fontWeight: "bold",
  },

  statusTagCancel: {
    color: "#dc3545", // đỏ
    fontWeight: "bold",
  },

  statusTagRefund: {
    color: "#fd7e14", // cam
    fontWeight: "bold",
  },

  statusTagExpired: {
    color: "#6c757d", // xám tối
    fontWeight: "bold",
  },

  statusTagPending: {
    color: "#ffc107", // vàng
    fontWeight: "bold",
  },
});
