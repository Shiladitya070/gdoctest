import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import DocumentEdit from "./pages/DocumentEdit";

function App() {
  return (
    <Router>
      {/* <Toaster /> */}
      <Routes>
        <Route path="/doc/:roomId" element={<DocumentEdit />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
