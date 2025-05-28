import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";

const QuantitySelector = ({ maxQuantity, value, onChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [textValue, setTextValue] = useState(value?.toString() || "0");

  // Đồng bộ khi prop value thay đổi từ ngoài
  useEffect(() => {
    setTextValue(value?.toString() || "0");
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    let num = parseInt(textValue, 10);

    if (isNaN(num) || num < 0) {
      num = 0;
    }
    if (num > maxQuantity) {
      Toast.show({
        type: "error",
        text1: "⚠️ Quantity Exceeded!",
        text2: `Only up to ${maxQuantity} tickets are available.`,
      });
      num = maxQuantity;
    }
    // Cập nhật số lượng đúng chuẩn khi blur
    setTextValue(num.toString());
    onChange(num);
  };

  const handleChangeText = (text) => {
    // Cho phép xóa hết để nhập lại (text rỗng)
    if (text === "") {
      setTextValue("");
      return;
    }

    // Chỉ cho phép nhập số
    const num = parseInt(text, 10);
    if (isNaN(num)) {
      // Không cập nhật nếu không phải số
      return;
    }

    // Giới hạn maxQuantity ngay khi nhập
    if (num > maxQuantity) {
      Toast.show({
        type: "error",
        text1: "⚠️ Quantity Exceeded!",
        text2: `Only up to ${maxQuantity} tickets are available.`,
      });
      return;
    }

    setTextValue(text);
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <TouchableOpacity
        onPress={() => setIsEditing(true)}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          paddingHorizontal: 12,
          paddingVertical: 6,
          minWidth: 50,
          marginRight: 8,
          marginLeft: 8,
          justifyContent: "center",
        }}
      >
        {isEditing ? (
          <TextInput
            keyboardType="number-pad"
            autoFocus
            value={textValue}
            onChangeText={handleChangeText}
            onBlur={handleBlur}
            style={{ fontSize: 16, padding: 0, margin: 0 }}
          />
        ) : (
          <Text style={{ fontSize: 16 }}>{textValue || "0"}</Text>
        )}
      </TouchableOpacity>

      <View
        style={{
          flex: 1,
          borderColor: "#ccc",
          borderRadius: 6,
          overflow: "hidden",
        }}
      >
        <Picker
          selectedValue={value || 0}
          onValueChange={(val) => onChange(val)}
          dropdownIconColor="#000"
          style={{ height: 30, width: 40 }}
        >
          {Array.from({ length: maxQuantity + 1 }, (_, i) => (
            <Picker.Item key={i} label={`${i}`} value={i} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default QuantitySelector;
