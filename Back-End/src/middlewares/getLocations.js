const { Detail, fn, conn } = require("../db.js");
const { Router } = require("express");
const router = Router();

module.exports = router.get("/", async (req, res, next) => {
  try {
    const locations = await Detail.findAll({
      attributes: [[fn("DISTINCT", conn.col("location")), "location"]],
      order: ["location"],
    });

    if (!locations.length) res.status(404).send();

    res.status(200).json(locations.map((item) => item.location));
  } catch (error) {
    next(error);
  }
});
