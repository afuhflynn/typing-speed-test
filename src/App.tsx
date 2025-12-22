import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import Results from "./pages/result";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/result" element={<Results />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
