const db = require("../config/db");

// GET ALL
exports.getAllMasterData = async () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM master_data", (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// GET BY ID
exports.getMasterDataById = async (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM master_data WHERE master_data_id = ?",
      [id],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// GET BY CATEGORY
exports.getByCategory = async (category) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM master_data WHERE category = ?",
      [category],
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};

// GET ONLY CATEGORIES
exports.getOnlyCategories = async () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT DISTINCT category FROM master_data",
      (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      }
    );
  });
};