import React from "react";
import { WebView } from "react-native-webview";

const ContractPdfScreen = ({ route }) => {
  const { url } = route.params;

  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    url
  )}`;

  return <WebView source={{ uri: viewerUrl }} style={{ flex: 1 }} />;
};

export default ContractPdfScreen;
