import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import EmployeeList from "./components/EmployeeList";
import CompanyManagement from "./components/CompanyManagement";
import DepartmentManagement from "./components/DepartmentManagement";
import LocationManagement from "./components/LocationManagement";
import JobPosition from "./components/JobPosition";
import Salary from "./components/Salary";
import Attendance from "./components/Attendance";
import LeaveRequest from "./components/LeaveRequest";
import LeaveList from "./components/LeaveList";
import ManagerApproval from "./components/ManagerApproval";



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
              <Route path="/companies" element={<CompanyManagement />} />
              <Route path="/departments" element={<DepartmentManagement />} />
              <Route path="/locations" element={<LocationManagement />} />
              <Route path="/job-positions" element={<JobPosition />} />
              <Route path="/salary" element={<Salary />} />
              <Route path="/attendance" element={< Attendance/>} />
              <Route path="/leave-add" element={<LeaveRequest />} />
              <Route path="/leaves" element={<LeaveList />} />
              <Route path="/manager-approval" element={<ManagerApproval />} />
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