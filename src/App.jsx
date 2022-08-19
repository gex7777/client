import { Homepage } from "./pages/Homepage";
import { Playpage } from "./pages/PlayPage";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Homepage />} />
        <Route path="/play" element={<Playpage />} />
      </Routes>
    </div>
  );
}

export default App;
