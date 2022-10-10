import React, { useState } from "react";
import Header from "./Header";
import RentalsList from "./RentalsList";

export default function Container() {
  const [apiKey, setApiKey] = useState("");
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [darkMode, setDarkMode] = useState(false)


  const handleApiKey = (key) => {
    setApiKey(key);
  };

  const handleDateFormat = (format) => {
    if (format.target.checked) {
      setDateFormat('DD/MM/YYYY');
    } else {
      setDateFormat('MM.DD.YYYY');
    }
  };

  const handleApperance = (e) => {
    setDarkMode(!e.target.checked)
  };

  return (
    <>
      <Header
        apiKey={apiKey}
        handleApiKey={handleApiKey}
        handleDateFormat={handleDateFormat}
        handleApperance={handleApperance}
      />
      <RentalsList
        apiKey={apiKey}
        dateFormat={dateFormat}
        darkMode={darkMode}
        handleApiKey={handleApiKey}
      />
    </>
  );
}
