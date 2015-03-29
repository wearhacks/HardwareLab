'use strict';

var express = require('express');
var controller = require('./rental.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/archive', controller.archive);
router.get('/current', controller.current);
router.get('/user/:id', controller.user_rental);
router.get('/product/:id', controller.product_rental);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.post('/return',controller.returnProd);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
