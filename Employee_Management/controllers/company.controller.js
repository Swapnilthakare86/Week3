const Company = require("../models/company.model");

exports.createCompany = async (req, res) => {
  try {
    const result = await Company.createCompany(req.body);
    res.json({ message: "Company created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const rows = await Company.getAllCompanies();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const rows = await Company.getCompanyById(req.params.id);
    if (!rows.length) 
        return res.status(404).json({ message: "Company not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const rows = await Company.getCompanyById(req.params.id);
    if (!rows.length)
         return res.status(404).json({ message: "Company not found" });

    await Company.updateCompany(req.params.id, req.body);
    res.json({ message: "Company updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const result = await Company.deleteCompany(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Company not found" });

    res.json({ message: "Company deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};