import { useEffect, useState } from "react";
import HireCosplayerService from "../apiServices/hireCosplayerService/hireCosplayerService";
import HireHistoryService from "../apiServices/hireHistoryService/hireHistoryService";

const useHireHistoryData = (userId) => {
  const [historyData, setHistoryData] = useState([]);
  const [cosplayers, setCosplayers] = useState({});
  const [characters, setCharacters] = useState({});
  const [contracts, setContracts] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

      const sorted = [...history].sort(
        (a, b) => new Date(b.startDate) - new Date(a.startDate)
      );

      setHistoryData(sorted);
      setCosplayers(cosMap);
      setCharacters(charMap);
      setContracts(contractMap);
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
    isLoading,
    refetch: fetchAllData,
  };
};

export default useHireHistoryData;
