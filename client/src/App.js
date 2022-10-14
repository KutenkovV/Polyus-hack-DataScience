import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";

function App() {
  return (
    <div className="content">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
