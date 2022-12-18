const { Router } = require('express');

const router = Router();

router.use(require('../middlewares/createPreference.js'));

module.exports = router;