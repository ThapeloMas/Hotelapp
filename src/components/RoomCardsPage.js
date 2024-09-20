import React from "react";
import RoomCard from "./RoomCard";
import SearchBar from "./SearchBar";
import "./RoomCardsPage.css"; 

const RoomCardsPage = () => {
  return (
    <div>
  
      <SearchBar />

     
      <div className="room-section">
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
};

export default RoomCardsPage;
