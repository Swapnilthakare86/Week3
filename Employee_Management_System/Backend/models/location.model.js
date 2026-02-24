const db = require("../config/db");

// CREATE
exports.createLocation = async (data) => {
  const sql = `
    INSERT INTO location 
    (company_id, location_name, address, city, state, country)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.company_id,
        data.location_name,
        data.address,
        data.city,
        data.state,
        data.country
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

// GET ALL
exports.getAllLocations = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM location", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET BY ID
exports.getLocationById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM location WHERE location_id = ?",
      [id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// UPDATE
exports.updateLocation = async (id, data) => {
  const sql = `
    UPDATE location
    SET company_id = ?, location_name = ?, address = ?, city = ?, state = ?, country = ?
    WHERE location_id = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(
      sql,
      [
        data.company_id,
        data.location_name,
        data.address,
        data.city,
        data.state,
        data.country,
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
exports.deleteLocation = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "DELETE FROM location WHERE location_id = ?",
      [id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};