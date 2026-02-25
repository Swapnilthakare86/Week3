const db = require("../config/db");

// CREATE
exports.createCompany = async (data) => {
  const sql = `
    INSERT INTO company
    (company_name, registration_number, email, phone, created_at)
    VALUES (?, ?, ?, ?, ?)
  `;

  const [result] = await db.execute(sql, [
    data.company_name,
    data.registration_number,
    data.email,
    data.phone,
    data.created_at
  ]);

  return result;
};

// GET ALL
exports.getAllCompanies = async () => {
  const [rows] = await db.execute("SELECT * FROM company");
  return rows;
};

// GET BY ID
exports.getCompanyById = async (id) => {
  const [rows] = await db.execute(
    "SELECT * FROM company WHERE company_id = ?",
    [id]
  );
  return rows;
};

// UPDATE
exports.updateCompany = async (id, data) => {
  const sql = `
    UPDATE company
    SET company_name = ?, registration_number = ?, email = ?, phone = ?
    WHERE company_id = ?
  `;

  const [result] = await db.execute(sql, [
    data.company_name,
    data.registration_number,
    data.email,
    data.phone,
    id
  ]);

  return result;
};

// DELETE
exports.deleteCompany = async (id) => {
  const [result] = await db.execute(
    "DELETE FROM company WHERE company_id = ?",
    [id]
  );

  return result;
};