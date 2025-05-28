// alertHelper.js
import React, { useState } from "react";
import CustomAlert from './../../app_source/components/common/CustomAlert';

let showAlert;

export const AlertProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");
  const [type, setType] = useState("info");

  showAlert = (message, alertType = "info") => {
    setMsg(message);
    setType(alertType);
    setVisible(true);
  };

  return (
    <>
      {children}
      <CustomAlert visible={visible} message={msg} type={type} onClose={() => setVisible(false)} />
    </>
  );
};

export function alert(message, type = "info") {
  if (showAlert) {
    showAlert(message, type);
  } else {
    // fallback nếu chưa mount AlertProvider
    console.warn("AlertProvider chưa mount");
  }
}
