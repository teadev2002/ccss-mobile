import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import MyRentalCostumeService from "../../../apiServices/MyCostumeService/MyRentalCostumeService";
import { Picker } from "@react-native-picker/picker";
import styles from "../styles/EditRentalStyle";

export default function EditRentalRequestScreen({ route, navigation }) {
  const { rentalData } = route.params;

  console.log(rentalData.requestId);

  const [name, setName] = useState(rentalData.name);
  const [description, setDescription] = useState(rentalData.description || "");
  const [location, setLocation] = useState(rentalData.location);
  const [deposit, setDeposit] = useState(0);
  const [characterOptions, setCharacterOptions] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [costumes, setCostumes] = useState(
    rentalData.charactersListResponse?.map((c) => ({
      id: c.requestCharacterId,
      costume: c.characterName,
      characterId: c.characterId || "",
      description: c.description || "",
      maxHeight: c.maxHeight || 0,
      minHeight: c.minHeight || 0,
      maxWeight: c.maxWeight || 0,
      minWeight: c.minWeight || 0,
      quantity: c.quantity || 1,
      unitPrice: rentalData.price || 0, // hoặc đơn giá theo costume nếu có riêng
      totalPrice: (rentalData.price || 0) * (c.quantity || 1),
    })) || []
  );

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const data = await MyRentalCostumeService.getAllCharacters();

        setCharacters(data);
      } catch (error) {
        console.error("Lỗi lấy danh sách character:", error.message);
      }
    };
    fetchCharacters();
  }, []);

  const handleAddCostume = () => {
    setCostumes([
      ...costumes,
      {
        id: Date.now().toString(),
        costume: "", // to be selected later
        description: "",
        maxHeight: 0,
        minHeight: 0,
        maxWeight: 0,
        minWeight: 0,
        quantity: 1,
        unitPrice: 0,
        totalPrice: 0,
      },
    ]);
  };

  const calculateTotalDays = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
  };

  const updateTotalDeposit = (updatedCostumes) => {
    const total = updatedCostumes.reduce((sum, c) => {
      const base = c.unitPrice * totalDays + c.unitPrice * 5;
      return sum + base * c.quantity;
    }, 0);
    setDeposit(total);
  };

  const totalDays = calculateTotalDays(
    rentalData.startDate,
    rentalData.endDate
  );

  const handleRemoveCostume = (id) => {
    setCostumes(costumes.filter((item) => item.id !== id));
  };

  const handleCharacterChange = (index, selectedId) => {
    const selectedCharacter = characters.find(
      (c) => c.characterId === selectedId
    );
    const newCostumes = [...costumes];
    const quantity = newCostumes[index].quantity || 1;
    const price = selectedCharacter.price;
    const totalPrice = (price * totalDays + price * 5) * quantity;

    newCostumes[index] = {
      ...newCostumes[index],
      characterId: selectedId,
      costume: selectedCharacter.characterName,
      description: selectedCharacter.description,
      maxHeight: selectedCharacter.maxHeight,
      minHeight: selectedCharacter.minHeight,
      maxWeight: selectedCharacter.maxWeight,
      minWeight: selectedCharacter.minWeight,
      unitPrice: price,
      totalPrice,
    };

    setCostumes(newCostumes);
    updateTotalDeposit(newCostumes);
  };

  const prepareUpdatePayload = () => {
    return {};
  };

  const handleSave = async () => {
    try {
      const requestId = rentalData.requestId; // ID đơn thuê hiện tại

      // 1. Tách costumes mới (chưa có requestCharacterId hợp lệ) và đã có
      const newCharacters = costumes.filter(
        (c) => !isValidUUID(c.id) // hoặc c.id kiểu số => mới
      );

      const existingCharacters = costumes.filter((c) => isValidUUID(c.id));

      // 2. Thêm từng character mới (nếu có)
      for (const c of newCharacters) {
        const payloadAddChar = {
          requestId,
          characterId: c.characterId,
          description: c.description,
          cosplayerId: null,
          quantity: c.quantity,
          addRequestDates: [
            {
              startDate: `00:00 ${rentalData.startDate}`,
              endDate: `00:00 ${rentalData.endDate}`,
            },
          ],
        };

        console.log(
          "Adding character with payload:",
          JSON.stringify(payloadAddChar, null, 2)
        );

        try {
          await MyRentalCostumeService.addCharacterToRequest(payloadAddChar);
          console.log(`Added character ${c.characterId} successfully.`);
        } catch (error) {
          console.error(`Error adding character ${c.characterId}:`, error);
          throw new Error(
            `Lỗi ở bước thêm nhân vật ${c.characterId}: ${error.message}`
          );
        }
      }

      // 3. Lấy lại dữ liệu request mới nhất
      let updatedRequest;
      try {
        updatedRequest =
          await MyRentalCostumeService.GetRequestCostumeByRequestId(requestId);
        console.log("Data mới:", JSON.stringify(updatedRequest, null,2));
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu request mới:", error);
        throw new Error(`Lỗi ở bước lấy dữ liệu request: ${error.message}`);
      }

      // 4. Tính deposit mới (theo data mới nhất từ server)
      let newDeposit;
      try {
        newDeposit = calculateDepositFromRequest(updatedRequest);
        console.log("Tính deposit mới thành công:", newDeposit);
      } catch (error) {
        console.error("Lỗi khi tính deposit:", error);
        throw new Error(`Lỗi ở bước tính deposit: ${error.message}`);
      }

      // 5. Gửi cập nhật deposit
      try {
        await MyRentalCostumeService.updateDepositRequest(requestId, {
          deposit: newDeposit.toString(),
        });
        console.log("Cập nhật deposit thành công");
      } catch (error) {
        console.error("Lỗi khi cập nhật deposit:", error);
        throw new Error(`Lỗi ở bước cập nhật deposit: ${error.message}`);
      }
      // try {
      //   const payloadUpdateRequest = {
      //     name: rentalData.name, // vd: "Nammmmmmmm"
      //     description: rentalData.description, // vd: "thue do a"
      //     price: newDeposit.toString(), // vd: 820000 (number)
      //     startDate: rentalData.startDate, // vd: "22/05/2025"
      //     endDate: rentalData.endDate, // vd: "23/05/2025"
      //     location: rentalData.location, // vd: "q1"
      //     serviceId: rentalData.serviceId, // vd: "S001"
      //     packageId: rentalData.packageId || null, // null hoặc giá trị cụ thể
      //     listUpdateRequestCharacters:  updatedRequest.charactersListResponse.map((c) => ({
      //       requestCharacterId: c.requestCharacterId || null, // UUID nếu có, null nếu mới
      //       characterId: c.characterId,
      //       cosplayerId: c.cosplayerId || null,
      //       description: c.description,
      //       quantity: c.quantity,
      //     })),
      //   };
      //   console.log(
      //     "payloadUpdateRequest",
      //     JSON.stringify(payloadUpdateRequest, null, 2)
      //   );
      //   await MyRentalCostumeService.editRequest(
      //     requestId,
      //     payloadUpdateRequest
      //   );
      // } catch (error) {
      //   console.error("Lỗi khi cập nhật :", error);
      //   throw new Error(`Lỗi ở bước cập nhật: ${error.message}`);
      // }

      alert("Cập nhật thành công!");
      navigation.goBack();
    } catch (error) {
      console.error("Lỗi tổng:", error);
      alert(error.message || "Có lỗi xảy ra khi lưu. Vui lòng thử lại.");
    }
  };

  const calculateDepositFromRequest = (request) => {
    const totalDays = calculateTotalDays(request.startDate, request.endDate);
    let sum = 0;
    request.charactersListResponse.forEach((c) => {
      const price = c.characterDetails?.price || 0;
      const quantity = c.quantity || 1;
      sum += (price * totalDays + price * 5) * quantity;
    });
    return sum;
  };

  // Hàm kiểm tra UUID (ví dụ đơn giản)
  const isValidUUID = (id) => {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Rental Request</Text>

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

      <Text>📅 Start Date: {rentalData.startDate}</Text>
      <Text>📅 Return Date: {rentalData.endDate}</Text>
      <Text>💰 Deposit: {deposit.toLocaleString()} VND</Text>

      {/* Costume Section */}
      <View style={styles.costumeHeader}>
        <Text style={styles.subtitle}>🎭 Costumes</Text>
        <TouchableOpacity onPress={handleAddCostume} style={styles.addBtn}>
          <Text style={{ color: "#fff" }}>➕ Add Costume</Text>
        </TouchableOpacity>
      </View>

      {costumes.map((item, index) => (
        <View key={item.id} style={styles.costumeCard}>
          {/* Costume Picker Placeholder */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={item.characterId}
              onValueChange={(value) => handleCharacterChange(index, value)}
              style={styles.picker}
            >
              <Picker.Item label="-- Select Character --" value="" />
              {characters.map((char) => (
                <Picker.Item
                  key={char.characterId}
                  label={char.characterName}
                  value={char.characterId}
                />
              ))}
            </Picker>
          </View>
          <TextInput
            style={styles.input}
            value={item.costume}
            editable={false}
          />

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={item.description}
            onChangeText={(text) => {
              const newData = [...costumes];
              const qty = parseInt(text) || 1;
              const price = newData[index].unitPrice;
              newData[index].quantity = qty;
              newData[index].totalPrice = (price * totalDays + price * 5) * qty;
              setCostumes(newData);
              updateTotalDeposit(newData);
            }}
          />

          <Text style={styles.label}>Max Height: {item.maxHeight} cm</Text>
          <Text style={styles.label}>Min Height: {item.minHeight} cm</Text>
          <Text style={styles.label}>Max Weight: {item.maxWeight} kg</Text>
          <Text style={styles.label}>Min Weight: {item.minWeight} kg</Text>

          <Text style={styles.label}>Quantity:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={item.quantity.toString()}
            onChangeText={(text) => {
              const newData = [...costumes];
              const qty = parseInt(text) || 0;
              const price = newData[index].unitPrice;
              newData[index].quantity = qty;
              newData[index].totalPrice = (price * totalDays + price * 5) * qty;
              setCostumes(newData);
              updateTotalDeposit(newData); // <-- cập nhật lại deposit
            }}
          />

          <Text style={styles.label}>
            Unit Price: {item.unitPrice.toLocaleString()} VND
          </Text>
          <Text style={styles.label}>
            Total Price: {item.totalPrice.toLocaleString()} VND
          </Text>

          <TouchableOpacity
            onPress={() => handleRemoveCostume(item.id)}
            style={styles.removeBtn}
          >
            <Text style={{ color: "#fff" }}>🗑 Remove Costume</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>💾 Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
