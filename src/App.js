import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store"; // Redux store
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Payment from "./components/Payment";
import RoomCardsPage from "./components/RoomCardsPage"; // New room cards route

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/rooms" element={<RoomCardsPage />} /> {/* New route */}
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
