import React from "react";
import RoomCard from "./RoomCard";
import SearchBar from "./SearchBar"; // Import SearchBar component
import "./RoomCardsPage.css"; // Custom styles for the page

const RoomCardsPage = () => {
  return (
    <div>
      {/* Include the SearchBar at the top */}
      <SearchBar />

      {/* Room cards section */}
      <div className="room-section">
        <RoomCard />
        <RoomCard />
      </div>
    </div>
  );
};

export default RoomCardsPage;
