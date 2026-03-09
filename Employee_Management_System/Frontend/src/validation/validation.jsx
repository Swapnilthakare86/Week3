export const validateEmployee = (data) => {

  let errors = {};

  if (!data.employee_code)
    errors.employee_code = "Employee code required";

  if (!data.first_name)
    errors.first_name = "First name required";

  if (!data.last_name)
    errors.last_name = "Last name required";

  if (!data.email)
    errors.email = "Email required";

  if (!data.phone)
    errors.phone = "Phone required";

  if (!data.dob)
    errors.dob = "DOB required";

  if (!data.gender)
    errors.gender = "Gender required";

  if (!data.company_id)
    errors.company_id = "Company required";

  if (!data.location_id)
    errors.location_id = "Location required";

  if (!data.department_id)
    errors.department_id = "Department required";

  if (!data.job_position_id)
    errors.job_position_id = "Position required";

  if (!data.employment_type_id)
    errors.employment_type_id = "Employment type required";


  if (!data.hire_date)
    errors.hire_date = "Hire date required";

  return errors;
};

// src/utils/validation.js

export const validateDepartment = (formData) => {
  const errors = {};

  if (!formData.company_id) {
    errors.company_id = "Please select a company.";
  }

  if (!formData.department_name) {
    errors.department_name = "Department name is required.";
  } else if (formData.department_name.length < 2) {
    errors.department_name = "Department name must be at least 2 characters.";
  }

  return errors;
};

export const validateLocation = (formData) => {
  const errors = {};

  if (!formData.company_id) errors.company_id = "Please select a company.";
  if (!formData.location_name) errors.location_name = "Location name is required.";
  if (!formData.address) errors.address = "Address is required.";
  if (!formData.city) errors.city = "City is required.";
  if (!formData.state) errors.state = "State is required.";
  if (!formData.country) errors.country = "Country is required.";

  return errors;
};

export const validateCompany = (formData) => {

  const errors = {};

  if (!formData.company_name || formData.company_name.trim() === "") {
    errors.company_name = "Company name is required.";
  }

  if (!formData.registration_number || formData.registration_number.trim() === "") {
    errors.registration_number = "Registration number is required.";
  }

  if (!formData.email) {
    errors.email = "Email is required.";
  } 
  

  if (!formData.phone) {
    errors.phone = "Phone number is required.";
  } 
  

  if (!formData.created_at) {
    errors.created_at = "Created date is required.";
  }

  return errors;
};


export const validateSalary = (formData) => {

  const errors = {};

  if (!formData.employee_id || formData.employee_id === "") {
    errors.employee_id = "Employee is required.";
  }

  if (!formData.basic_salary) {
    errors.basic_salary = "Basic salary is required.";
  } 
  else if (Number(formData.basic_salary) <= 0) {
    errors.basic_salary = "Basic salary must be greater than 0.";
  }

  if (!formData.deductions && formData.deductions !== 0) {
    errors.deductions = "Deductions are required.";
  } 
  else if (Number(formData.deductions) < 0) {
    errors.deductions = "Deductions cannot be negative.";
  }

  if (
    formData.basic_salary &&
    formData.deductions &&
    Number(formData.deductions) > Number(formData.basic_salary)
  ) {
    errors.deductions = "Deductions cannot be greater than basic salary.";
  }

  if (!formData.start_date) {
    errors.start_date = "Salary date is required.";
  }

  return errors;
};



export const validateLeaveRequest = (formData) => {
  const errors = {};

  if (!formData.employee_id) {
    errors.employee_id = "Employee is required.";
  }

  if (!formData.leave_type_id) {
    errors.leave_type_id = "Leave type is required.";
  }

  if (!formData.start_date) {
    errors.start_date = "Start date is required.";
  }

  if (!formData.end_date) {
    errors.end_date = "End date is required.";
  }

  if (formData.start_date && formData.end_date) {
    if (new Date(formData.end_date) < new Date(formData.start_date)) {
      errors.end_date = "End date cannot be before start date.";
    }
  }

  if (!formData.reason || formData.reason.trim() === "") {
    errors.reason = "Reason is required.";
  }

  if (!formData.approved_by) {
    errors.approved_by = "Manager selection is required.";
  }

  return errors;
};