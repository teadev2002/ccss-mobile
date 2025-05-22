// hooks/useEventData.js
import { useEffect, useState } from "react";
import MyEventOrganizeService from "../apiServices/eventOrganizeService/MyEventOrganizeService";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat); 
const useEventData = (accountId) => {
  const [events, setEvents] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // 🔹 Gọi cả 2 API
        const [eventData, contractData] = await Promise.all([
          MyEventOrganizeService.getAllRequestByAccountId(accountId),
          MyEventOrganizeService.getAllContractByAccountId(accountId),
        ]);

        // 🔹 Lọc và format event
        const filteredEvents = eventData
          .filter((e) => e.serviceId === "S003")
          .map((e) => ({
            ...e,
            startDate: dayjs(e.startDate, "HH:mm DD/MM/YYYY").format("DD/MM/YYYY"),
            endDate: dayjs(e.endDate, "HH:mm DD/MM/YYYY").format("DD/MM/YYYY"),
          }));

        // 🔹 Lọc contract theo requestId và serviceId
        const filteredContracts = contractData.filter(
          (c) =>filteredEvents.some(e => e.requestId === c.requestId)
        );

        setEvents(filteredEvents);
        setContracts(filteredContracts);

        console.log("🔹 Events:", JSON.stringify(filteredEvents, null, 2));
        console.log("🔹 Contracts:", JSON.stringify(filteredContracts, null, 2));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchData();
    }
  }, [accountId]);

  return { events, contracts, loading };
};

export default useEventData;

