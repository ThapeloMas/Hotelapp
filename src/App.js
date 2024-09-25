// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store"; // Import the Redux store
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Payment from "./components/Payment";
import RoomCardsPage from "./components/RoomCardsPage";
import BookingDetails from "./components/BookingDetails";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Provider store={store}>
      {" "}
      {/* Make sure the Provider is wrapping the Router */}
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/rooms" element={<RoomCardsPage />} />{" "}
          {/* RoomCardsPage Route */}
          <Route path="/bookingdetails" element={<BookingDetails />} />
          <Route path="/admin" element={<AdminDashboard />} />{" "}
          {/* AdminDashboard Route */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
