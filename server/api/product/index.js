'use strict';

var express = require('express');
var controller = require('./product.controller');
var fs = require('fs-extra');    //File System-needed for renaming file etc
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/',auth.hasRole('admin'), controller.create);
router.put('/:id',auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.post('/upload', auth.hasRole('admin'), controller.upload);



module.exports = router;

