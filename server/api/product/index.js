'use strict';

var express = require('express');
var controller = require('./product.controller');
var fs = require('fs-extra');    //File System-needed for renaming file etc

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.post('/upload', controller.upload);



module.exports = router;

