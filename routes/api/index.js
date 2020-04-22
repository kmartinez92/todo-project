const router = require('express').Router();
const fruitRoutes = require('./fruit');
const sweetRoutes = require('./sweets');

//now the route is /api/fruit  and /api/sweets
router.use('/fruit', fruitRoutes);
router.use('/sweets', sweetRoutes);

module.exports = router;