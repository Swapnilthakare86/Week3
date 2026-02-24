
// EMPLOYEE VALIDATION
exports.validateEmployee = (req, res, next) => {
  const { employee_code, first_name, email } = req.body;

  if (!employee_code || !first_name || !email) {
    return res.status(400).json({
      message: "employee_code, first_name, and email are required"
    });
  }

  next();
};

// ATTENDANCE VALIDATION
exports.validateAttendance = (req, res, next) => {
  const { employee_id, attendance_date, attendance_status_id } = req.body;

  if (!employee_id || !attendance_date || !attendance_status_id) {
    return res.status(400).json({
      message: "employee_id, attendance_date, and attendance_status_id are required"
    });
  }

  next();
};

// SALARY VALIDATION
exports.validateSalary = (req, res, next) => {
  const { employee_id, basic_salary } = req.body;

  if (!employee_id || !basic_salary) {
    return res.status(400).json({
      message: "employee_id and basic_salary are required"
    });
  }

  next();
};

// LEAVE REQUEST VALIDATION
exports.validateLeaveRequest = (req, res, next) => {
  const { employee_id, leave_type_id, start_date, end_date } = req.body;

  if (!employee_id || !leave_type_id || !start_date || !end_date) {
    return res.status(400).json({
      message: "employee_id, leave_type_id, start_date, end_date are required"
    });
  }

  next();
};