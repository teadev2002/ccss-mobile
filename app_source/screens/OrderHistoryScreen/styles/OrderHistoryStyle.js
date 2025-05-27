import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    height: 80,
    paddingTop: 30,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#22668a",
  },
  shippingStatusContainer: {
  flexDirection: "row",
  alignItems: "center",
  marginVertical: 12,
  flexWrap: "wrap",
  justifyContent: "center",
},
shippingStep: {
  flexDirection: "row",
  alignItems: "center",
},
circle: {
  width: 24,
  height: 24,
  borderRadius: 12,
  alignItems: "center",
  justifyContent: "center",
  marginHorizontal: 4,
},
circleCompleted: {
  backgroundColor: "green",
},
circlePending: {
  backgroundColor: "#ccc",
},
stepLabel: {
  fontSize: 12,
  textAlign: "center",
  color: "#666",
  marginHorizontal: 4,
  maxWidth: 90,
},
stepLabelActive: {
  color: "#000",
  fontWeight: "bold",
},
line: {
  height: 2,
  width: 20,
  backgroundColor: "#ccc",
},
lineActive: {
  backgroundColor: "green",
},
lineInactive: {
  backgroundColor: "#ccc",
},
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContent: {
    padding: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: "#eee",
  },
  filterButtonActive: {
    backgroundColor: "#22668a",
  },
  filterButtonText: {
    fontSize: 14,
    color: "#333",
  },
  filterButtonTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },
  orderItem: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  orderDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#ccc",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },

  orderTotal: {
    fontSize: 14,
    color: "#22668a",
    marginBottom: 10,
    fontWeight: "bold",
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
    minWidth: 70,
    alignItems: "center",
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  status_paid: {
    backgroundColor: "#28a745",
  },
  status_pending: {
    backgroundColor: "#ffc107",
  },
  status_canceled: {
    backgroundColor: "#dc3545",
  },
  status_unknown: {
    backgroundColor: "#6c757d",
  },
  viewDetailButton: {
    marginTop: 10,
    backgroundColor: "#22668a",
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: "center",
  },
  viewDetailButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    maxHeight: "90%",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#22668a",
    marginBottom: 12,
  },
  detailText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: "#eee",
  },
  productName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
  },
  productQuantity: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#22668a",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;
