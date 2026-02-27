import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Navigate to="/employees" />} />
          <Route path="/employees" element={<EmployeeForm />} />
          <Route path="/employees-list" element={<EmployeeList />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;