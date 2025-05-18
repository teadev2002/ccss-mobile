// hooks/useEventData.js
import { useEffect, useState } from "react";
import MyEventOrganizeService from "../apiServices/eventOrganizeService/MyEventOrganizeService";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";



const mapTabFromEvent = (event) => {
  const deposit = event.deposit ?? "0"; // fallback nếu null/undefined

  if (event.status === "Pending" && (deposit === "0" || deposit === "")) return 0;
  if (event.status === "Pending") return 1;
  if (event.status === "Deposited") return 2;
  if (event.status === "Completed") return 3;
  return -1;
};

const useEventData = (accountId) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  dayjs.extend(customParseFormat);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await MyEventOrganizeService.getAllRequestByAccountId(accountId);
        const filtered = data
          .filter((e) => e.serviceId === "S003")
          .map((e) => ({
            ...e,
            tab: mapTabFromEvent(e),
            startDate: dayjs(e.startDate, "HH:mm DD/MM/YYYY").format("DD/MM/YYYY"),
            endDate: dayjs(e.endDate, "HH:mm DD/MM/YYYY").format("DD/MM/YYYY"),
          }));
        setEvents(filtered);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    if (accountId) {
      fetchEvents();
    }
  }, [accountId]);

  return { events, loading };
};


export default useEventData;
