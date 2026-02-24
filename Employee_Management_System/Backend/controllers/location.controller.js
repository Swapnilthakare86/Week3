const Location = require("../models/location.model");

exports.createLocation = async (req, res) => {
  try {
    const result = await Location.createLocation(req.body);
    res.json({ message: "Location created", id: result.insertId });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getAllLocations = async (req, res) => {
  try {
    const rows = await Location.getAllLocations();
    res.json(rows);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getLocationById = async (req, res) => {
  try {
    const rows = await Location.getLocationById(req.params.id);
    if (!rows.length) 
        return res.status(404).json({ message: "Location not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateLocation = async (req, res) => {
  try {
    const rows = await Location.getLocationById(req.params.id);
    if (!rows.length)
         return res.status(404).json({ message: "Location not found" });

    await Location.updateLocation(req.params.id, req.body);
    res.json({ message: "Location updated successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deleteLocation = async (req, res) => {
  try {
    const result = await Location.deleteLocation(req.params.id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Location not found" });

    res.json({ message: "Location deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};