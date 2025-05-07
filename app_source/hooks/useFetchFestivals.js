import { useState, useEffect } from "react";
import FestivalService from "../apiServices/festivalService/festivalService";

const useFetchFestivals = () => {
  const [eventItems, setEventItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const events = await FestivalService.getAllFestivals();
        setEventItems(events);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };
      fetchEvents();
  },[]);

  return { eventItems, isLoading };
};
export default useFetchFestivals;
