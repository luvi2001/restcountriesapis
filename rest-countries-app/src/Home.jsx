import React, { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import ActionWrapper from "./components/Action/ActionWrapper";
import CountriesWrapper from "./components/Hero/CountriesWrapper";
import "./index.css";

function Home() {
  const [query, setQuery] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decoded =jwtDecode(token); // Decode JWT token
        console.log(decoded.name);
        setUserName(decoded.name); // Extract name from token payload
      } catch (err) {
        console.error("Invalid token", err);
        setUserName(""); // Reset username if token is invalid
      }
    }
  }, []);

  return (
    <main>
      <div className="p-4 text-right text-gray-700 font-medium">
        {userName ? `Welcome, ${userName}!` : "Welcome, Guest!"}
      </div>
      <ActionWrapper setQuery={setQuery} />
      <CountriesWrapper query={query} />
    </main>
  );
}

export default Home;
