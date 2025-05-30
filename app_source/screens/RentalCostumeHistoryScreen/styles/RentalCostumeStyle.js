import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f2f5',
  },

  header: {
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1e293b',
  },

  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    marginBottom: 16,
  },

  sortRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },

  pickerContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
  },

  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    backgroundColor: '#e2e8f0',
    borderRadius: 10,
    padding: 4,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },

  activeTab: {
    backgroundColor: '#2563eb',
  },

  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },

  statusFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
    justifyContent: 'flex-start',
  },

  statusBtn: {
    borderWidth: 1,
    borderColor: '#94a3b8',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: '#f8fafc',
  },

  statusBtnActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },

  statusText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2563eb',
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  statusBadge: {
  alignSelf: "flex-start",
  borderRadius: 12,
  paddingVertical: 4,
  paddingHorizontal: 10,
  marginTop: 6,
},

statusText: {
  fontSize: 13,
  fontWeight: "600",
  textTransform: "capitalize",
},

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },

  status: {
    backgroundColor: '#3b82f6',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    overflow: 'hidden',
    marginTop: 4,
    alignSelf: 'flex-start',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },

  editBtn: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  detailBtn: {
    flex: 1,
    backgroundColor: '#64748b',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  // Bổ sung styles cho các nút đặc biệt
  payBtn: {
    flex: 1,
    backgroundColor: '#22c55e', // xanh lá tươi mát, button Pay
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  cancelBtn: {
    flex: 1,
    backgroundColor: '#ef4444', // đỏ nổi bật, nút Cancel
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },

  feedbackBtn: {
    flex: 1,
    backgroundColor: '#f97316', // cam ấm áp, nút Feedback
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default styles;
