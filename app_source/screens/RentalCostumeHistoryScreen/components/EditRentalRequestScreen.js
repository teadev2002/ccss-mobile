import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MyRentalCostumeService from "../../../apiServices/MyCostumeService/MyRentalCostumeService";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/EditRentalStyle";
import dayjs from "dayjs";

export default function EditRentalRequestScreen({ route, navigation }) {
  const { rentalData } = route.params;
  const [name, setName] = useState(rentalData.name);
  const [description, setDescription] = useState(rentalData.description || "");
  const [location, setLocation] = useState(rentalData.location);
  const [deposit, setDeposit] = useState(rentalData.deposit || 0);
  const [characters, setCharacters] = useState([]);
  const [costumes, setCostumes] = useState([]);
  const [charactersToRemove, setCharactersToRemove] = useState([]);
  const [originalQuantities, setOriginalQuantities] = useState({});
  const [initialName] = useState(rentalData.name);
  const [initialDescription] = useState(rentalData.description || "");
  const [initialLocation] = useState(rentalData.location);
  const [initialCostumes, setInitialCostumes] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm loading cho lưu
  const scrollViewRef = useRef(null);
  useEffect(() => {
    const initializeData = async () => {
      setLoading(true);
      try {
        // Initialize costumes
        const initialCostumesData =
          rentalData.charactersListResponse?.map((c) => ({
            id: c.requestCharacterId,
            costume: c.characterName || "",
            characterId: c.characterId || "",
            description: c.description || "",
            maxHeight: c.maxHeight || 0,
            minHeight: c.minHeight || 0,
            maxWeight: c.maxWeight || 0,
            minWeight: c.minWeight || 0,
            quantity: c.quantity || 1,
            maxQuantity: c.characterDetails?.quantity || c.quantity || 1,
            unitPrice: c.characterDetails?.price || 0,
            totalPrice:
              (c.characterDetails?.price || 0) * (c.quantity || 1) * totalDays,
          })) || [];

        setCostumes(initialCostumesData);
        setInitialCostumes(JSON.parse(JSON.stringify(initialCostumesData)));

        // Initialize original quantities
        const quantities = initialCostumesData.reduce(
          (acc, c) => ({
            ...acc,
            [c.id]: c.quantity || 1,
          }),
          {}
        );
        setOriginalQuantities(quantities);

        // API CALL: getAllCharacters
        const data = await MyRentalCostumeService.getAllCharacters();
        setCharacters(data);

        // Calculate initial deposit
        updateTotalDeposit(initialCostumesData);
      } catch (error) {
        console.error("Error initializing data:", error.message);
        alert("Không thể tải danh sách nhân vật.");
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, []);

  const calculateTotalDays = (start, end) => {
    const startDate = dayjs(start, "DD/MM/YYYY");
    const endDate = dayjs(end, "DD/MM/YYYY");
    return endDate.diff(startDate, "day") || 1;
  };

  const totalDays = calculateTotalDays(
    rentalData.startDate,
    rentalData.endDate
  );

  const calculateDepositFromCostumes = (costumes) => {
    return costumes.reduce((sum, c) => {
      const price = c.unitPrice || 0;
      const quantity = c.quantity || 1;
      return sum + (price * (totalDays + 1) + price * 5) * quantity;
    }, 0);
  };

  const updateTotalDeposit = (updatedCostumes) => {
    const total = calculateDepositFromCostumes(updatedCostumes);
    setDeposit(total);
  };

  const handleAddCostume = () => {
    const newCostume = {
      id: Date.now().toString(),
      costume: "",
      characterId: "",
      description: "",
      maxHeight: 0,
      minHeight: 0,
      maxWeight: 0,
      minWeight: 0,
      quantity: 1,
      maxQuantity: 1,
      unitPrice: 0,
      totalPrice: 0,
    };
    const newCostumes = [...costumes, newCostume];
    setCostumes(newCostumes);
    updateTotalDeposit(newCostumes);
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleRemoveCostume = (id) => {
    if (costumes.length <= 1) {
      alert("Không thể xóa nhân vật cuối cùng! Cần ít nhất một nhân vật.");
      return;
    }
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa nhân vật này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: () => {
          const costume = costumes.find((c) => c.id === id);
          if (isValidUUID(id)) {
            setCharactersToRemove([
              ...charactersToRemove,
              { requestCharacterId: id },
            ]);
          }
          const newCostumes = costumes.filter((item) => item.id !== id);
          setCostumes(newCostumes);
          updateTotalDeposit(newCostumes);
          setOriginalQuantities((prev) => {
            const newQuantities = { ...prev };
            delete newQuantities[id];
            return newQuantities;
          });
        },
      },
    ]);
  };

  const handleCharacterChange = (index, selectedId) => {
    const selectedCharacter = characters.find(
      (c) => c.characterId === selectedId
    );
    if (!selectedCharacter) {
      alert("Nhân vật không hợp lệ!");
      return;
    }

    const isDuplicate = costumes.some(
      (c, i) => i !== index && c.characterId === selectedId
    );
    if (isDuplicate) {
      alert("Nhân vật này đã được chọn!");
      return;
    }

    const newCostumes = [...costumes];
    const quantity = newCostumes[index].quantity || 1;
    const price = selectedCharacter.price || 0;
    const totalPrice = price * totalDays * quantity;

    newCostumes[index] = {
      ...newCostumes[index],
      characterId: selectedId,
      costume: selectedCharacter.characterName || "",
      description: selectedCharacter.description || "",
      maxHeight: selectedCharacter.maxHeight || 0,
      minHeight: selectedCharacter.minHeight || 0,
      maxWeight: selectedCharacter.maxWeight || 0,
      minWeight: selectedCharacter.minWeight || 0,
      maxQuantity: selectedCharacter.quantity || 1,
      unitPrice: price,
      totalPrice,
    };

    setCostumes(newCostumes);
    updateTotalDeposit(newCostumes);
  };

  const handleDescriptionChange = (index, text) => {
    const newCostumes = [...costumes];
    newCostumes[index].description = text;
    setCostumes(newCostumes);
  };
  const handleQuantityChange = (index, text) => {
    const newCostumes = [...costumes];
    const costume = newCostumes[index];

    // Cho phép chuỗi rỗng tạm thời
    if (text === "") {
      newCostumes[index].quantity = ""; // Lưu chuỗi rỗng tạm thời
      newCostumes[index].totalPrice = 0;
      setCostumes(newCostumes);
      updateTotalDeposit(newCostumes);
      return;
    }

    // Chuyển đổi thành số
    const qty = parseInt(text);
    if (isNaN(qty)) {
      return; // Bỏ qua nếu không phải số
    }

    const currentQuantity = originalQuantities[costume.id] || costume.quantity;

    if (qty < 1) {
      // Không hiển thị alert ngay, sẽ kiểm tra khi lưu
      newCostumes[index].quantity = qty;
      newCostumes[index].totalPrice = 0;
      setCostumes(newCostumes);
      updateTotalDeposit(newCostumes);
      return;
    }

    if (qty > currentQuantity) {
      const additionalQty = qty - currentQuantity;
      const maxAllowed = Math.min(costume.maxQuantity || 10, 10);
      if (additionalQty > maxAllowed) {
        alert(
          `Không đủ hàng cho ${costume.costume}. Yêu cầu thêm ${additionalQty}, nhưng chỉ có ${maxAllowed} sẵn có!`
        );
        return;
      }
    }

    const price = costume.unitPrice || 0;
    newCostumes[index].quantity = qty;
    newCostumes[index].totalPrice = price * totalDays * qty;
    setCostumes(newCostumes);
    updateTotalDeposit(newCostumes);
  };

  const isValidUUID = (id) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    );
  };

  const isDataChanged = () => {
    if (
      name !== initialName ||
      description !== initialDescription ||
      location !== initialLocation ||
      deposit !== rentalData.deposit
    ) {
      return true;
    }

    if (
      costumes.length !== initialCostumes.length ||
      charactersToRemove.length > 0
    ) {
      return true;
    }

    return costumes.some((c, i) => {
      const initialC = initialCostumes[i];
      return (
        c.characterId !== initialC.characterId ||
        c.description !== initialC.description ||
        c.quantity !== initialC.quantity ||
        c.unitPrice !== initialC.unitPrice
      );
    });
  };

  const handleSave = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!name || !location) {
        alert("Tên và địa điểm là bắt buộc!");
        return;
      }
      if (costumes.length === 0) {
        alert("Cần ít nhất một nhân vật!");
        return;
      }
      for (const c of costumes) {
        if (!c.characterId) {
          alert(`Vui lòng chọn nhân vật cho ${c.costume || "chưa xác định"}!`);
          return;
        }
        if (c.quantity <= 0) {
          alert(`Số lượng của ${c.costume} phải lớn hơn 0!`);
          return;
        }
      }
      if (totalDays > 5) {
        alert("Thời gian thuê không được vượt quá 5 ngày!");
        return;
      }

      if (!isDataChanged()) {
        alert("Không có thay đổi nào được phát hiện!");
        navigation.goBack();
        return;
      }

      const requestId = rentalData.requestId;
      const requestData =
        await MyRentalCostumeService.GetRequestCostumeByRequestId(requestId);
      if (requestData.status === "Browsed") {
        alert("Yêu cầu đã được duyệt, vui lòng tải lại dữ liệu!");
        navigation.goBack();
        return;
      }

      const deletePromises = charactersToRemove.map(async (char) => {
        await MyRentalCostumeService.DeleteCharacterInReq(
          char.requestCharacterId
        );
      });
      await Promise.all(deletePromises);

      const newCharacters = costumes.filter((c) => !isValidUUID(c.id));
      for (const c of newCharacters) {
        const payloadAddChar = {
          requestId,
          characterId: String(c.characterId),
          description: c.description || "shared",
          cosplayerId: null,
          quantity: c.quantity,
          addRequestDates: [
            {
              startDate: dayjs(rentalData.startDate, "DD/MM/YYYY").format(
                "HH:mm DD/MM/YYYY"
              ),
              endDate: dayjs(rentalData.endDate, "DD/MM/YYYY").format(
                "HH:mm DD/MM/YYYY"
              ),
            },
          ],
        };
        await MyRentalCostumeService.addCharacterToRequest(payloadAddChar);
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
      const updatedRequest =
        await MyRentalCostumeService.GetRequestCostumeByRequestId(requestId);

      const updatedCostumes = costumes.map((c) => {
        if (!isValidUUID(c.id)) {
          const serverChar = updatedRequest.charactersListResponse.find(
            (sc) => sc.characterId === c.characterId
          );
          return {
            ...c,
            id: serverChar?.requestCharacterId || c.id,
          };
        }
        return c;
      });
      setCostumes(updatedCostumes);

      const totalPrice = updatedCostumes.reduce((sum, c) => {
        const price = c.unitPrice || 0;
        return sum + price * c.quantity * totalDays;
      }, 0);
      const payloadUpdateRequest = {
        name,
        description: description || "",
        price: totalPrice,
        startDate: rentalData.startDate,
        endDate: rentalData.endDate,
        location,
        serviceId: rentalData.serviceId || "S001",
        packageId: rentalData.packageId || null,
        listUpdateRequestCharacters: updatedCostumes.map((c) => ({
          requestCharacterId: isValidUUID(c.id) ? c.id : null,
          characterId: String(c.characterId),
          cosplayerId: null,
          description: c.description || "shared",
          quantity: c.quantity,
          currentQuantity: originalQuantities[c.id] || c.quantity,
        })),
      };
      await MyRentalCostumeService.editRequest(requestId, payloadUpdateRequest);

      const newDeposit = calculateDepositFromCostumes(updatedCostumes);
      await MyRentalCostumeService.updateDepositRequest(requestId, {
        deposit: newDeposit.toString(),
      });
      setDeposit(newDeposit);

      const updatedCharactersPromises = updatedCostumes.map(async (c) => {
        const charData = await MyRentalCostumeService.getCharacterById(
          c.characterId
        );
        return {
          ...c,
          maxQuantity: charData.quantity || 1,
        };
      });
      const finalCostumes = await Promise.all(updatedCharactersPromises);
      setCostumes(finalCostumes);

      setCharactersToRemove([]);
      setOriginalQuantities(
        finalCostumes.reduce(
          (acc, c) => ({
            ...acc,
            [c.id]: c.quantity,
          }),
          {}
        )
      );

      alert("Cập nhật thành công!");
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi:", error);
      alert(error.message || "Không thể lưu thay đổi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const renderCostume = ({ item, index }) => (
    <View style={styles.costumeCard}>
      <Picker
        selectedValue={item.characterId}
        onValueChange={(value) => handleCharacterChange(index, value)}
        style={styles.picker}
      >
        <Picker.Item label="-- Chọn nhân vật --" value="" />
        {characters.map((char) => (
          <Picker.Item
            key={char.characterId}
            label={char.characterName}
            value={char.characterId}
          />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        value={item.costume}
        editable={false}
        placeholder="Nhân vật"
      />

      <Text style={styles.label}>Cosplayer Description:</Text>
      <TextInput
        style={styles.input}
        value={item.description}
        onChangeText={(text) => handleDescriptionChange(index, text)}
      />

      <View style={styles.row}>
        <Text style={styles.label}>
          👤 Height: {item.minHeight} - {item.maxHeight} cm
        </Text>
        <Text style={styles.label}>
          ⚖️ Weight: {item.minWeight} - {item.maxWeight} kg
        </Text>
      </View>

      <Text style={styles.label}>Quantity:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={item.quantity.toString()}
        onChangeText={(text) => handleQuantityChange(index, text)}
        onBlur={() => {
          const newCostumes = [...costumes];
          const currentQty = newCostumes[index].quantity;
          if (currentQty === "" || currentQty < 1) {
            newCostumes[index].quantity = 1; // Đặt lại thành 1 nếu rỗng hoặc nhỏ hơn 1
            newCostumes[index].totalPrice =
              newCostumes[index].unitPrice * (totalDays + 1);
            setCostumes(newCostumes);
            updateTotalDeposit(newCostumes);
            alert(`Số lượng của ${newCostumes[index].costume} phải lớn hơn 0!`);
          }
        }}
      />

      <View style={styles.row}>
        <Text style={styles.label}>
          💵 Unit Price: {item.unitPrice.toLocaleString()} VND
        </Text>
        <Text style={styles.label}>
          🧮 Total Price: {item.totalPrice.toLocaleString()} VND
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => handleRemoveCostume(item.id)}
        style={styles.removeBtn}
      >
        <Text style={styles.removeBtnText}>🗑 Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container} ref={scrollViewRef}>
        <Text style={styles.title}>🎫 Edit Rental Costume</Text>

        {/* General Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔧 Over View</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Name"
          />
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={setDescription}
            placeholder="Description"
          />
          <TextInput
            style={styles.input}
            value={location}
            onChangeText={setLocation}
            placeholder="Location"
          />
          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              📅 Start Date:{" "}
              <Text style={styles.metaValue}>{rentalData.startDate}</Text>
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaText}>
              📅 Return Date:{" "}
              <Text style={styles.metaValue}>{rentalData.endDate}</Text>
            </Text>
          </View>
        </View>

        {/* Costume Section */}
        <View style={styles.section}>
          <View style={styles.costumeHeader}>
            <Text style={styles.sectionTitle}>🎭 Cosplayers</Text>
            <TouchableOpacity onPress={handleAddCostume} style={styles.addBtn}>
              <Ionicons name="add-circle" size={20} color="#fff" />
              <Text style={styles.addBtnText}>Add new</Text>
            </TouchableOpacity>
          </View>

          {characters.length === 0 ? (
            <Text style={styles.emptyText}>No Cosplayer</Text>
          ) : (
            <FlatList
              data={costumes}
              renderItem={renderCostume}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          )}
        </View>

        {/* Spacer để tránh footer che nội dung */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Fixed Footer */}
      <View style={styles.footer}>
        <View style={styles.footerContent}>
          <Text style={styles.footerText}>
            💰 Deposit:{" "}
            <Text style={styles.footerValue}>
              {deposit.toLocaleString()} VND
            </Text>
          </Text>
          <TouchableOpacity
            style={[styles.footerBtn, loading && styles.footerBtnDisabled]}
            onPress={handleSave}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.footerBtnText}>💾 Save </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
