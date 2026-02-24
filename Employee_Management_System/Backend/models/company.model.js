const db = require("../config/db");

// CREATE
exports.createCompany = async (data) => {
  const sql = `
    INSERT INTO company
    (company_name, registration_number, email, phone, created_at)
    VALUES (?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.company_name,
        data.registration_number,
        data.email,
        data.phone,
        data.created_at
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// GET ALL
exports.getAllCompanies = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM company", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET BY ID
exports.getCompanyById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM company WHERE company_id = ?",
      [id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// UPDATE
exports.updateCompany = async (id, data) => {
  const sql = `
    UPDATE company
    SET company_name = ?, registration_number = ?, email = ?, phone = ?
    WHERE company_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.company_name,
        data.registration_number,
        data.email,
        data.phone,
        id
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// DELETE
exports.deleteCompany = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM company WHERE company_id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};