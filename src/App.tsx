import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LeetCodePage } from "./pages/LeetCodePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/leetcode" element={<LeetCodePage />} />
    </Routes>
  );
}
