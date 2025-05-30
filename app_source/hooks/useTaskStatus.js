import { useEffect, useState } from "react";
import hireHistoryService from "../apiServices/hireHistoryService/hireHistoryService";


const useTaskStatus = (accountId, contractId) => {
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const tasks = await hireHistoryService.getAllTaskByAccountId(accountId);
        const matchedTask = tasks.find(
          (task) =>
            task.contractId === contractId && task.accountId === accountId
        );
        if (matchedTask?.status) setStatus(matchedTask.status);
      } catch (err) {
        console.error("Failed to fetch task status:", err);
      }
    };

    if (accountId && contractId) {
      fetchStatus();
    }
  }, [accountId, contractId]);

  return status;
};

export default useTaskStatus;
