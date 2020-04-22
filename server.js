const router = require('express').Router();
const db = require('todo.model.js');
const mongoose = require('mongoose');

module.exports = router;
//route to create Fruit


//route to get Fruits
router.get('/api/fruit', (req, res) => {
	db.Fruit
		.find({})
		.then((fruits) => {
			res.json(fruits);
		})
		.catch((err) => {
			res.json(err);
		});
});


