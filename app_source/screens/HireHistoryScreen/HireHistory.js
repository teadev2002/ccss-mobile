import React, { useState, useContext } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, Button } from "react-native-paper";
import styles from "./css/HireHistoryStyles";

import { AuthContext } from "../../../assets/context/AuthContext";
import useHireHistoryData from "../../hooks/useHireHistoryData";
import RequestCard from "./components/RequestCard";
import EditRequestModal from "./components/EditRequestModal";
import ChangeCosplayerModal from "./components/ChangeCosplayerModal";
import LoadingSpinner from "../HireCosplayScreen/components/common/LoadingSpinner";
import { COSPLAYER_STATUS, REQUEST_STATUS } from "../../const/StatusHistory";
import HireCosplayerService from "../../apiServices/hireCosplayerService/hireCosplayerService";
import hireHistoryService from "../../apiServices/hireHistoryService/hireHistoryService";

const HireHistory = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { historyData, cosplayers, characters, contracts, isLoading, refetch } =
    useHireHistoryData(user?.id);

  //  console.log("historyData", JSON.stringify(historyData, null, 2));
  // console.log("cosplayers", JSON.stringify(cosplayers, null, 2));
  // console.log("characters", JSON.stringify(characters, null, 2));
  // console.log("contracts", JSON.stringify(contracts, null, 2));

  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [viewContractId, setViewContractId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [editModalData, setEditModalData] = useState(null);
  const [changeCosplayerModal, setChangeCosplayerModal] = useState(null);
  const [openedContractId, setOpenedContractId] = useState(null);
  const [localChanges, setLocalChanges] = useState({});

  const handleEditRequest = (request) => {
    try {
      const rawStartDate =
        request.charactersListResponse?.[0]?.requestDateResponses?.[0]
          ?.startDate || "";
      if (!rawStartDate) {
        alert("Start date not found!");
        return;
      }

      // Lấy phần ngày trong chuỗi "08:00 01/06/2025"
      const startDateStr = rawStartDate.split(" ")[1]; // "01/06/2025"
      if (!startDateStr) {
        alert("Invalid start date format!");
        return;
      }

      // Parse thành Date object
      const [day, month, year] = startDateStr.split("/");
      const startDateObj = new Date(year, month - 1, day);

      // Ngày hôm nay (bỏ giờ phút)
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      // Tính số ngày cách biệt
      const diffTime = startDateObj.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays >= 3) {
        // Cho phép edit - mở modal
        setEditModalData({
          name: request.name,
          description: request.description,
          requestId: request.requestId,
          location: request.location,
          charactersList: request.charactersListResponse,
        });
      } else {
        alert(
          "Editing is allowed only if the start date is at least 3 days from today."
        );
      }
    } catch (error) {
      alert("Error when trying to edit request.");
      console.error(error);
    }
  };
  const handleConfirmChangeCosplayer = async (newCosplayerId) => {
    try {
      const { characterId, requestId, onConfirm } = changeCosplayerModal;

      // Cập nhật local state tạm thời
      setLocalChanges((prev) => ({
        ...prev,
        [requestId]: {
          ...(prev[requestId] || {}),
          [characterId]: newCosplayerId,
        },
      }));

      // Gọi callback truyền từ RequestCard (nếu có) để đồng bộ cập nhật
      if (onConfirm) {
        onConfirm(newCosplayerId);
      }

      setChangeCosplayerModal(null);
    } catch (error) {
      alert("Failed to update cosplayer locally");
    }
  };

  const toggleContractView = (requestId) => {
    setOpenedContractId((prev) => (prev === requestId ? null : requestId));
  };

  const toggleExpand = (requestId) => {
    setExpandedRequestId((prev) => (prev === requestId ? null : requestId));
    setViewContractId(null);
  };

  const toggleViewContract = (requestId) => {
    setExpandedRequestId(requestId);
    setViewContractId(requestId);
  };

  const filteredHistory =
    filterStatus === "All"
      ? historyData
      : historyData.filter(
          (req) => req.status.toLowerCase() === filterStatus.toLowerCase()
        );

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Button
          style={styles.backButton}
          icon={() => <Feather name="arrow-left" size={24} color="#fff" />}
          onPress={() => navigation.goBack()}
        />
      </View>

      {/* HERO SECTION */}
      <LinearGradient
        colors={["#510545", "#22668a", "#1a1a2e"]}
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>Your Cosplay Rentals</Text>
        <Text style={styles.heroSubtitle}>
          You have submitted {filteredHistory.length} request
          {filteredHistory.length > 1 ? "s" : ""}.
        </Text>

        <ScrollView horizontal style={styles.filterRow}>
          {Object.keys(REQUEST_STATUS).map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => {
                setFilterStatus(status);
                refetch();
              }}
            >
              <Text
                style={[
                  styles.filterButton,
                  filterStatus === status && styles.filterButtonActive,
                ]}
              >
                {status.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>

      {/* REQUEST LIST */}
      {isLoading ? (
        <LoadingSpinner message="Loading your history..." />
      ) : (
        <ScrollView style={styles.content}>
          {filteredHistory.map((request) => {
            const contract = contracts[request.requestId];
            const isExpanded = expandedRequestId === request.requestId;
            const isCanceled = request.status === REQUEST_STATUS.Cancel;
            return (
              <View key={request.requestId}>
                <RequestCard
                  request={request}
                  contract={contract}
                  cosplayers={cosplayers}
                  characters={characters}
                  expanded={isExpanded}
                  onToggleExpand={() => toggleExpand(request.requestId)}
                  viewContract={openedContractId === request.requestId}
                  onToggleContractView={() =>
                    toggleContractView(request.requestId)
                  }
                  onEdit={() => handleEditRequest(request)}
                  onChangeCosplayer={({
                    characterId,
                    currentCosplayerId,
                    requestDateResponses,
                    requestCharacterId,
                    onConfirm,
                  }) => {
                    setChangeCosplayerModal({
                      characterId,
                      currentCosplayerId,
                      requestDateResponses,
                      requestCharacterId,
                      onConfirm, // 👈 Quan trọng: truyền hàm callback xuống modal
                    });
                  }}
                  COSPLAYER_STATUS={COSPLAYER_STATUS}
                  reason={isCanceled ? request.reason : "cancel"}
                />
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* MODALS */}
      {editModalData && (
        <EditRequestModal
          data={editModalData}
          setData={setEditModalData}
          characters={characters}
          cosplayers={cosplayers}
          localChanges={localChanges[editModalData.requestId] || {}} // <- thêm dòng này
          onCancel={() => setEditModalData(null)}
          onSave={async (payload) => {
            try {
              await hireHistoryService.editRequest(
                editModalData.requestId,
                payload
              );
              Alert.alert("Success", "Request has been updated successfully.");
              setEditModalData(null);
              refetch();
            } catch (error) {
              console.error("Edit request failed:", error);
              Alert.alert(
                "Error",
                "Failed to update the request. Please try again."
              );
            }
          }}
          onChangeCosplayer={setChangeCosplayerModal}
        />
      )}

      {changeCosplayerModal && (
        <>
          <ChangeCosplayerModal
            characterId={changeCosplayerModal.characterId}
            currentCosplayerId={changeCosplayerModal.currentCosplayerId}
            requestDateResponses={changeCosplayerModal.requestDateResponses}
            cosplayers={cosplayers}
            onCancel={() => setChangeCosplayerModal(null)}
            onConfirm={(newCosplayerId) =>
              handleConfirmChangeCosplayer(newCosplayerId)
            }
          />
        </>
      )}
    </View>
  );
};

export default HireHistory;
