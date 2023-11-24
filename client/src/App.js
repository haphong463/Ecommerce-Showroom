import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Home } from "./containers/admin/Home";
import { About } from "./containers/admin/About";
import { Settings } from "./containers/admin/Settings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/settings" exact element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
