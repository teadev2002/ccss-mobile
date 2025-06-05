import { useState, useEffect } from "react";
import FestivalService from "../apiServices/festivalService/festivalService";

const useFetchFestivals = () => {
  const [eventItems, setEventItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const events = await FestivalService.getAllFestivals();
      // Giữ nguyên cấu trúc JSON từ API, không cần ánh xạ
      setEventItems(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return { eventItems, isLoading, fetchEvents };
};

export default useFetchFestivals;