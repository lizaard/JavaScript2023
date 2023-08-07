import "./App.css";
import CalendarData from "./components/calendar/calendar";
import Dashboard from "./components/dashboard/dashboard";
import Navbar from "./components/navbar/navbar";
import Posts from "./components/posts/posts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="posts" element={<Posts />} />
      <Route path="calendar" element={<CalendarData />} />
      </Routes>
    </>
  );
}

export default App;
