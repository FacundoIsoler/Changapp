const { Service, Supplier, Detail, Category, Op, conn } = require("../db.js");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res, next) => {
  //http://localhost:3000/services?by=location&location=location
  try {
    const { by, location } = req.query;

    if (by !== "location") return next();

    const findQuery = {
      include: { model: Supplier, include: { model: Detail } },
    };
    if (location) findQuery.include.include.where = { location };

    const search = await Service.findAll(findQuery);

    const services = search.filter(
      (element) => element["Suppliers"].length > 0
    );

    // if (!services.length)
    //   return res.status(404).send("No se encontaron resultados");

    return res.status(200).json(services);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
