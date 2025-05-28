import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  listContainer: {
  maxHeight: 280, 
  marginBottom: 12,
},

  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 12,
  },
  contentContainer: {
    backgroundColor: '#fefefe',
    width: '100%',
    borderRadius: 16,
    padding: 24,
    maxHeight: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#22668a',
    marginBottom: 16,
    textAlign: 'center',
  },
  itemText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  addressText: {
    marginTop: 12,
    fontSize: 15,
    color: '#555',
    fontStyle: 'italic',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    color: '#222',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  button: {
    flex: 1,
    backgroundColor: '#22668a',
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 10,
  },
  imageContainer: {
    width: 42,
    height: 42,
    borderRadius: 8,
    overflow: "hidden",
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  itemText: {
    fontSize: 16,
    fontWeight: "500",
  },
  itemPrice: {
    fontSize: 14,
    color: "#666",
  },
});
