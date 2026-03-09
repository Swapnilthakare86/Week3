import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import EmployeeList from "./components/EmployeeList";
// ...import other components

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{ height: "100vh" }}>
        {/* Fixed Header */}
        <header>
          <Header />
        </header>

        {/* Scrollable Body */}
        <main className="flex-grow-1 overflow-auto">
          <div className="container mt-3 mb-3">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/employees" element={<EmployeeList />} />
              {/* Add all other routes */}
            </Routes>
          </div>
        </main>

        {/* Fixed Footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;