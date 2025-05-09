import { useEffect, useState } from "react";
import HireCosplayerService from "../apiServices/hireCosplayerService/hireCosplayerService";
import HireHistoryService from "../apiServices/hireHistoryService/hireHistoryService";

const useHireHistoryData = (userId) => {
  const [historyData, setHistoryData] = useState([]);
  const [cosplayers, setCosplayers] = useState({});
  const [characters, setCharacters] = useState({});
  const [contracts, setContracts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cosplayerStatuses, setCosplayerStatuses] = useState({});

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [history, allCos, allChars, contractList] = await Promise.all([
        HireCosplayerService.getHistoryByAccountId(userId),
        HireCosplayerService.getAllCosplayers(),
        HireCosplayerService.getAllCharacters(),
        HireHistoryService.getAllContractByAccountId(userId),
      ]);

      const cosMap = {};
      allCos.forEach((cos) => (cosMap[cos.accountId] = cos));

      const charMap = {};
      allChars.forEach((char) => (charMap[char.characterId] = char));

      const contractMap = {};
      contractList.forEach((c) => {
        if (c.requestId) contractMap[c.requestId] = c;
      });

      // Fetch all cosplayer statuses
      const statusMap = {};
      await Promise.all(
        allCos.map(async (cos) => {
          try {
            const res = await HireHistoryService.getRequestCharacterByCosplayer(
              cos.accountId
            );
            

            const validStatuses = res.filter(
              (item) => item.status !== null && item.status !== undefined
            );
            const highestStatus = validStatuses.reduce(
              (max, cur) => (cur.status > max ? cur.status : max),
              0
            );
            statusMap[cos.accountId] = highestStatus;
          } catch (err) {
            console.error(`❌ Lỗi fetch status cho ${cos.accountId}:`, err);
            statusMap[cos.accountId] = 0;
          }
        })
      );

      const sorted = [...history].sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );

      setHistoryData(sorted);
      setCosplayers(cosMap);
      setCharacters(charMap);
      setContracts(contractMap);
      setCosplayerStatuses(statusMap);
    } catch (err) {
      console.error("Failed to fetch hire history:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchAllData();
    } else {
      setIsLoading(false);
    }
  }, [userId]);

  return {
    historyData,
    cosplayers,
    characters,
    contracts,
    cosplayerStatuses,
    isLoading,
    refetch: fetchAllData,
  };
};

export default useHireHistoryData;
