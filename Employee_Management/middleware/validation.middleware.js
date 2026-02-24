exports.validateEmployee = (req, res, next) => {
  const { employee_code, first_name, email } = req.body;

  if (!employee_code || !first_name || !email) {
    return res.status(400).json({ error: "employee_code, first_name, email required" });
  }
  next();
};