import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Camera from "./pages/Camera";
import Gallery from "./pages/Gallery";
import Print from "./pages/Print";
import End from "./pages/End";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/camera" element={<Camera />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/print" element={<Print />} />
      <Route path="/end" element={<End />} />
    </Routes>
  );
}

export default App;
