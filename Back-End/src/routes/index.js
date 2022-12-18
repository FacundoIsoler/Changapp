const { Router } = require("express");

const suppliers = require("./suppliers");
const services = require("./services");
const review = require("./review");
const service = require("./service");
const category = require("./category");
const location = require("./location");
const login = require("./login");
const userHandler = require("./userHandler");
const createPreference = require("./preference");
const users = require("./users");

const router = Router();

// TODO: lo correcto seria utilizar el plural para cada endpoint
// TODO: corregir 'reviews', 'services', 'categories', 'locations'
// TODO: valorar reemplazar 'userHandler' por 'users' o algun otro
// TODO: dependiendo de implementacion de Auth0
router.use("/users", users);

router.use("/suppliers", suppliers);
router.use("/services", services);
router.use("/review", review);
router.use("/service", service);
router.use("/category", category);
router.use("/location", location);
router.use("/userHandler", userHandler);
router.use("/create_preference", createPreference);

router.use("/login", login); // No tiene funcionalidad por ahora

module.exports = router;
