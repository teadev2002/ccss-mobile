import { useEffect, useState, useCallback } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import MyRentalCostumeService from "./../apiServices/MyCostumeService/MyRentalCostumeService";

dayjs.extend(customParseFormat);

const useEventData = (accountId, serviceId = "S001") => {
  const [history, setHistory] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!accountId) {
      setError("No accountId provided");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [historyData, contractData] = await Promise.all([
        MyRentalCostumeService.GetAllRequestByAccountId(accountId),
        MyRentalCostumeService.getAllContractByAccountId(accountId),
      ]);

      console.log("API historyData:", historyData);
      console.log("API contractData:", contractData);

      if (!Array.isArray(historyData) || !Array.isArray(contractData)) {
        throw new Error("Invalid API data");
      }

      const filteredHistory = historyData
        .filter((e) => e.serviceId === serviceId)
        .map((e) => {
          const startDate = dayjs(e.startDate, "HH:mm DD/MM/YYYY", true);
          const endDate = dayjs(e.endDate, "HH:mm DD/MM/YYYY", true);

          if (!startDate.isValid() || !endDate.isValid()) {
            console.warn(`Invalid date for request ${e.requestId}:`, {
              startDate: e.startDate,
              endDate: e.endDate,
            });
            return null;
          }

          return {
            ...e,
            startDate: startDate.format("DD/MM/YYYY"),
            endDate: endDate.format("DD/MM/YYYY"),
          };
        })
        .filter((e) => e !== null);

      // Hợp nhất dữ liệu request vào contracts
      const filteredContracts = contractData
        .filter((c) => filteredHistory.some((e) => e.requestId === c.requestId))
        .map((c) => {
          const matchingRequest = filteredHistory.find(
            (e) => e.requestId === c.requestId
          );
          return {
            ...c,
            name: matchingRequest?.name,
            description: matchingRequest?.description,
            location: matchingRequest?.location,
            startDate: matchingRequest?.startDate,
            endDate: matchingRequest?.endDate,
            price: matchingRequest?.price,
            deposit: matchingRequest?.deposit,
            charactersListResponse: matchingRequest?.charactersListResponse,
            status: c.status || matchingRequest?.status,
          };
        });

      setHistory(filteredHistory);
      setContracts(filteredContracts);

      if (__DEV__) {
        console.log("🔹 Events:", JSON.stringify(filteredHistory, null, 2));
        console.log("🔹 Contracts:", JSON.stringify(filteredContracts, null, 2));
      }
    } catch (error) {
      console.error("Failed to fetch data:", error.message);
      setError(error.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, [accountId, serviceId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return { history, contracts, loading, error, refresh };
};

export default useEventData;