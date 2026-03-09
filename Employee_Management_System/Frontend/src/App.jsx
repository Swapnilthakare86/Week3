import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import EmployeeList from "./components/EmployeeList";
import EmployeeCreate from "./components/EmployeeCreate";
import EmployeeUpdate from "./components/EmployeeUpdate";
import LeaveRequest from "./components/LeaveRequest";
import LeaveList from "./components/LeaveList";
import LeaveEdit from "./components/LeaveEdit";
import ManagerApproval from "./components/ManagerApproval";
import CompanyManagement from "./components/CompanyManagement";
import DepartmentManagement from "./components/DepartmentManagement";
import LocationManagement from "./components/LocationManagement";
import JobPosition from "./components/JobPosition";
import Salary from "./components/Salary";




function App() {

return (

<BrowserRouter>

<Header />

<div className="container mt-3">

<Routes>

<Route path="/" element={<Navigate to="/employees" />} />

<Route path="/employees" element={<EmployeeList />} />

<Route path="/add-employee" element={<EmployeeCreate />} />

<Route path="/update-employee/:id" element={<EmployeeUpdate />} />

<Route path="/apply-leave" element={<LeaveRequest/>}/>
<Route path="/leave-list" element={<LeaveList/>}/>
<Route path="/manager-approval" element={<ManagerApproval/>}/>
<Route path="/companies" element={<CompanyManagement />} />
<Route path="/departments" element={<DepartmentManagement/>} />
<Route path="/locations" element={<LocationManagement/>} />
<Route path="/job-positions" element={<JobPosition/>} />
<Route path="/salary" element={<Salary/>} />

</Routes>

</div>

<Footer />

</BrowserRouter>

);

}

export default App;