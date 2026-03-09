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