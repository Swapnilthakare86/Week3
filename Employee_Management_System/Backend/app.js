require("dotenv").config();

const express =require("express")
const app=express();


const PORT = process.env.PORT;

const employeeRoutes = require("./routes/employee.routes");
const errorHandler = require("./middleware/error.middleware");
const salaryRoutes = require("./routes/salary.routes");
const departmentRoutes = require("./routes/department.routes");
const jobPositionRoutes = require("./routes/jobPosition.routes");
const attendanceRoutes = require("./routes/attendance.routes");
const locationRoutes = require("./routes/location.routes");
const leaveRequestRoutes = require("./routes/leaveRequest.routes");
const companyRoutes = require("./routes/company.routes");
const masterDataRoutes = require("./routes/masterData.routes");



app.use(express.json());

app.use("/api/employees",employeeRoutes);
app.use("/api/salaries", salaryRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/job-positions", jobPositionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/leave-requests", leaveRequestRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/master-data", masterDataRoutes);

app.use(errorHandler);

app.listen(PORT,()=>{
    console.log(`Server Running on port http://localhost:${PORT}`);
})