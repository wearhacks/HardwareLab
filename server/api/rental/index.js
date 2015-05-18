'use strict';

var express = require('express');
var controller = require('./rental.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/archive', auth.hasRole('admin'), controller.archive);
router.get('/current', auth.hasRole('admin'), controller.current);
router.get('/user/:id', auth.isAuthenticated(), controller.user_rental);
router.get('/product/:id', auth.isAuthenticated(), controller.product_rental);
router.get('/:id', controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.post('/return', auth.hasRole('admin'), controller.returnProd);
router.put('/:id',auth.hasRole('admin'), controller.update);
router.patch('/:id',auth.hasRole('admin'), controller.update);
//router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;
