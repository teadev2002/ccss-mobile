// --- Các import giữ nguyên như bạn đã có ---
import React, { useContext, useMemo } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Button } from "react-native-paper";
import CharacterCard from "./CharacterCard";
import styles from "../css/HireHistoryStyles";
import PaymentService from "../../../apiServices/paymentService/paymentService";
import { AuthContext } from "../../../../assets/context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import PaymentPurpose from "../../../const/PaymentPurpose";
import { CONTRACT_STATUS, REQUEST_STATUS } from "../../../const/StatusHistory";
import HireHistoryService from "../../../apiServices/hireHistoryService/hireHistoryService";

const formatDateOnly = (dateString) => {
  if (!dateString) return "";
  const parts = dateString.split(" ");
  return parts[1] || "";
};

const RequestCard = ({
  request,
  contract,
  cosplayers,
  characters,
  expanded,
  onToggleExpand,
  viewContract,
  onToggleContractView,
  onEdit,
  onChangeCosplayer,
  COSPLAYER_STATUS,
  reason,
  cosplayerStatuses,
}) => {
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const status = request.status?.toLowerCase();
  const showContractSection =
    ["browsed", "finish"].includes(status) && contract;


  const depositAmount = useMemo(() => {
    const percent = parseFloat(request.deposit);
    const price = parseFloat(request.price);
    if (isNaN(percent) || isNaN(price)) return 0;
    return Math.round((price * percent) / 100);
  }, [request]);

  const statusMapping = {
    [CONTRACT_STATUS.Created]: {
      label: " - [Created]",
      style: styles.statusTagCreated,
    },
    [CONTRACT_STATUS.Deposited]: {
      label: " - [Deposited]",
      style: styles.statusTagDeposited,
    },
    [CONTRACT_STATUS.FinalSettlement]: {
      label: " - [Final]",
      style: styles.statusTagFinal,
    },
    [CONTRACT_STATUS.Completed]: {
      label: " - [Completed]",
      style: styles.statusTagComplete,
    },
    [CONTRACT_STATUS.Feedbacked]: {
      label: " - [Feedbacked]",
      style: styles.statusTagFeedbacked,
    },
    [CONTRACT_STATUS.Cancel]: {
      label: " - [Canceled]",
      style: styles.statusTagCancel,
    },
    [CONTRACT_STATUS.Refund]: {
      label: " - [Refunded]",
      style: styles.statusTagRefund,
    },
    [CONTRACT_STATUS.Expired]: {
      label: " - [Expired]",
      style: styles.statusTagExpired,
    },
  };

  const handlePayRemaining = async () => {
    const remaining = Math.round(Number(contract?.price) - depositAmount);
    const payload = {
      fullName: user.accountName,
      orderInfo: "",
      amount: remaining,
      purpose: PaymentPurpose.CONTRACT_SETTLEMENT,
      accountId: user?.id,
      ticketId: "",
      ticketQuantity: "",
      contractId: contract.contractId,
      orderpaymentId: "",
      isWeb: false,
    };
    try {
      const res = await PaymentService.DepositPayment(payload);
      if (res?.includes("http")) {
        navigation.navigate("PaymentWebviewScreen", { paymentUrl: res });
      } else {
        alert("Không nhận được link thanh toán.");
      }
    } catch (err) {
      alert("Thanh toán thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };

  const openContractPdf = () => {
    if (contract?.urlPdf) {
      navigation.navigate("ContractPdfScreen", { url: contract.urlPdf });
    } else {
      alert("Contract not available.");
    }
  };

  const handleFeedbackPress = async () => {
    try {
      const res = await HireHistoryService.getContractCharacterByContractId(
        contract.contractId
      );
      navigation.navigate("FeedbackCosplayerScreen", {
        cosplayersList: res.map((item) => ({
          cosplayerId: item.cosplayerId,
          characterId: item.characterId,
          characterName:
            characters?.[item.characterId]?.characterName || "Unknown",
          cosplayerName: cosplayers?.[item.cosplayerId]?.name || "Unknown",
          contractCharacterId: item.contractCharacterId,
        })),
        contractId: contract.contractId,
        accountId: user.id,
      });
    } catch (error) {
      console.error("❌ Lỗi lấy contractCharacters:", error);
      alert("Không thể tải thông tin nhân vật hợp đồng.");
    }
  };

  const handleViewFeedbackPress = async () => {
    try {
      const feedbackRes = await HireHistoryService.getFeedbackByContractId(
        contract.contractId
      );
      const contractCharacters =
        await HireHistoryService.getContractCharacterByContractId(
          contract.contractId
        );

      const combined = feedbackRes.feedbacks.map((fb) => {
        const match = contractCharacters.find(
          (cc) => cc.cosplayerId === fb.accountId
        );

        return {
          contractCharacterId: match?.contractCharacterId || null,
          cosplayerId: fb.accountId,
          characterId: match?.characterId || null,
          cosplayerName: cosplayers?.[fb.accountId]?.name || "Unknown",
          characterName:
            characters?.[match?.characterId]?.characterName || "Unknown",
          star: fb.star,
          description: fb.description,
        };
      });
      navigation.navigate("FeedbackCosplayerScreen", {
        cosplayersList: combined,
        contractId: feedbackRes.contractId,
        accountId: user.id,
        isViewMode: true,
      });
    } catch (error) {
      console.error("❌ Lỗi khi lấy feedback:", error);
      alert("Không thể tải phản hồi.");
    }
  };

  const handleDeposit = async () => {
    const payload = {
      fullName: user.accountName,
      orderInfo: "",
      amount: Number(depositAmount),
      purpose: PaymentPurpose.CONTRACT_DEPOSIT,
      accountId: user?.id,
      ticketId: "",
      ticketQuantity: "",
      contractId: contract.contractId,
      orderpaymentId: "",
      isWeb: false,
    };
    try {
      const res = await PaymentService.DepositPayment(payload);
      if (res?.includes("http")) {
        navigation.navigate("PaymentWebviewScreen", { paymentUrl: res });
      } else {
        alert("Không nhận được link thanh toán.");
      }
    } catch (err) {
      alert("Thanh toán thất bại: " + (err.message || "Lỗi không xác định"));
    }
  };


  const contractStatusComponentMap = {
    [CONTRACT_STATUS.FinalSettlement]: (
      <>
        <Button
          mode="outlined"
          icon="file-document-outline"
          onPress={openContractPdf}
          style={styles.flexBtn}
        >
          View Contract
        </Button>
        <Text>Waiting completed.</Text>
      </>
    ),
    [CONTRACT_STATUS.Deposited]: (
      <>
        <Button
          mode="outlined"
          icon="file-document-outline"
          onPress={openContractPdf}
          style={[styles.flexBtn, { marginBottom: 8 }]}
        >
          View Contract
        </Button>

        
        
        <Button
          mode="outlined"
          icon="cash-refund"
          onPress={handlePayRemaining}
          style={styles.flexBtn}
        >
          Pay Remaining
        </Button>
      </>
    ),
    [CONTRACT_STATUS.Completed]: (
      <>
        <Button
          mode="outlined"
          icon="file-document-outline"
          onPress={openContractPdf}
          style={[styles.flexBtn, { marginBottom: 8 }]}
        >
          View Contract
        </Button>
        <Button
          mode="outlined"
          style={styles.flexBtn}
          onPress={handleFeedbackPress}
        >
          <Text style={styles.editBtnText}>💬 Feedback Cosplayers</Text>
        </Button>
      </>
    ),
    [CONTRACT_STATUS.Feedbacked]: (
      <>
        <Button
          mode="outlined"
          icon="file-document-outline"
          onPress={openContractPdf}
          style={[styles.flexBtn, { marginBottom: 8 }]}
        >
          View Contract
        </Button>
        <Button
          mode="outlined"
          style={styles.flexBtn}
          onPress={handleViewFeedbackPress}
        >
          <Text style={styles.editBtnText}>💬 View Feedback</Text>
        </Button>
      </>
    ),
  };

  const renderActionButtons = () => (
    <View style={styles.actionRow}>
      <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
        <Text style={styles.actionText}>📝 Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={onToggleExpand}>
        <Text style={styles.actionText}>
          {expanded ? "▲ Hide Details" : "▼ View Details"}
        </Text>
      </TouchableOpacity>

      {showContractSection && (
        <TouchableOpacity
          style={styles.actionButton}
          onPress={onToggleContractView}
        >
          <Text style={styles.actionText}>
            {viewContract ? "▲ Hide Contract" : "📄 View Contract"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderContractSection = () => {
    if (!viewContract || !showContractSection) return null;

    return (
      <View style={[styles.contractInfo, { marginBottom: 12 }]}>
        <Text style={styles.contractTitle}>
          📑 Contract: {contract.contractName || "Cosplay Rental"}
        </Text>
        <Text style={styles.contractDetails}>
          Price: {Number(contract.price).toLocaleString()}đ
        </Text>
        <Text style={styles.contractDetails}>
          Deposit: {Number(depositAmount).toLocaleString()}đ ({contract.deposit}
          %)
        </Text>
        <Text style={styles.contractDetails}>
          Start: {formatDateOnly(contract.startDate)}
        </Text>
        <Text style={styles.contractDetails}>
          End: {formatDateOnly(contract.endDate)}
        </Text>

        <View style={styles.paymentButtonRow}>
          {status === REQUEST_STATUS.Browsed.toLowerCase() &&
            contract?.status && (
              <>
                {contractStatusComponentMap[contract.status] ?? (
                  <>
                    <Button
                      mode="outlined"
                      icon="file-document-outline"
                      onPress={openContractPdf}
                      style={[styles.flexBtn, { marginBottom: 8 }]}
                    >
                      View Contract
                    </Button>
                    <Button
                      mode="outlined"
                      icon="credit-card"
                      onPress={handleDeposit}
                      style={styles.flexBtn}
                    >
                      Pay Deposit
                    </Button>
                  </>
                )}
              </>
            )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.requestContainer}>
      <Text style={styles.requestTitle}>
        📦 {request.name} - {request.status}
        {contract?.status ? (
          <Text style={statusMapping[contract.status]?.style}>
            {statusMapping[contract.status]?.label}
          </Text>
        ) : (
          <Text style={styles.statusTagPending}> - [No Contract]</Text>
        )}
      </Text>

      <Text style={styles.dateRange}>
        📅 {formatDateOnly(request.startDate)} →{" "}
        {formatDateOnly(request.endDate)}
      </Text>
      <Text style={styles.cardText}>📍 Location: {request.location}</Text>
      <Text style={styles.cardTextHighlight}>
        💸 Price: {Number(request.price).toLocaleString()}đ
      </Text>
      <Text style={styles.cardTextHighlight}>
        🔐 Deposit: {depositAmount.toLocaleString()}đ ({request.deposit}%)
      </Text>
      <Text style={styles.cardText}>
        🎭 Cosplayers: {request.charactersListResponse.length}
      </Text>

      {request.status === "Cancel" && reason && (
        <Text style={{ color: "red", marginTop: 6 }}>
          ❌ Cancel Reason: {reason}
        </Text>
      )}

      {renderActionButtons()}
      {renderContractSection()}

      {expanded &&
        request.charactersListResponse.map((char, idx) => (
          <CharacterCard
            key={idx}
            {...(contract ? { contract } : {})}
            char={char}
            cosplayer={cosplayers[char.cosplayerId]}
            character={characters[char.characterId]}
            COSPLAYER_STATUS={COSPLAYER_STATUS}
            cosplayerStatuses={cosplayerStatuses}
          />
        ))}
    </View>
  );
};

export default RequestCard;
