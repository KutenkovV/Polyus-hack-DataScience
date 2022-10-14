import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./pages/main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
