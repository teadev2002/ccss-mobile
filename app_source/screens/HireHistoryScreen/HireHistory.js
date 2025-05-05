import React, { useState, useContext } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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

const HireHistory = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const { historyData, cosplayers, characters, contracts, isLoading, refetch } =
    useHireHistoryData(user?.id);

  const [expandedRequestId, setExpandedRequestId] = useState(null);
  const [viewContractId, setViewContractId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [editModalData, setEditModalData] = useState(null);
  const [changeCosplayerModal, setChangeCosplayerModal] = useState(null);
  const [openedContractId, setOpenedContractId] = useState(null);

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
                  onEdit={() =>
                    setEditModalData({
                      requestId: request.requestId,
                      location: request.location,
                      charactersList: request.charactersListResponse,
                    })
                  }
                  onChangeCosplayer={setChangeCosplayerModal}
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
          onCancel={() => setEditModalData(null)}
          onSave={() => {
            setEditModalData(null);
            refetch(); 
          }}
          onChangeCosplayer={setChangeCosplayerModal}
        />
      )}

      {changeCosplayerModal && (
        <ChangeCosplayerModal
          onCancel={() => setChangeCosplayerModal(null)}
          onConfirm={() => {
            // TODO: Call API đổi cosplayer ở đây nếu có
            setChangeCosplayerModal(null);
            refetch(); 
          }}
        />
      )}
    </View>
  );
};

export default HireHistory;
