import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import MyRentalCostumeService from "./../apiServices/MyCostumeService/MyRentalCostumeService";

dayjs.extend(customParseFormat);

const useEventData = (accountId) => {
  const [history, setHistory] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // 🔹 Gọi cả 2 API
      const [historyData, contractData] = await Promise.all([
        MyRentalCostumeService.GetAllRequestByAccountId(accountId),
        MyRentalCostumeService.getAllContractByAccountId(accountId),
      ]);

      // 🔹 Lọc và format event
      const filteredHistory = historyData
        .filter((e) => e.serviceId === "S001")
        .map((e) => ({
          ...e,
          startDate: dayjs(e.startDate, "HH:mm DD/MM/YYYY").format("DD/MM/YYYY"),
          endDate: dayjs(e.endDate, "HH:mm DD/MM/YYYY").format("DD/MM/YYYY"),
        }));

      // 🔹 Lọc contract theo requestId và serviceId
      const filteredContracts = contractData.filter((c) =>
        filteredHistory.some((e) => e.requestId === c.requestId)
      );

      setHistory(filteredHistory);
      setContracts(filteredContracts);

      console.log("🔹 Events:", JSON.stringify(filteredHistory, null, 2));
      console.log("🔹 Contracts:", JSON.stringify(filteredContracts, null, 2));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }, [accountId]);

  useEffect(() => {
    if (accountId) {
      fetchData();
    }
  }, [accountId, fetchData]);

  const refresh = useCallback(async () => {
    if (accountId) {
      await fetchData();
    }
  }, [accountId, fetchData]);

  return { history, contracts, loading, refresh };
};

export default useEventData;