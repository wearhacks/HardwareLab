'use strict';

var express = require('express');
var controller = require('./product.controller');
var fs =require('fs-extra');    //File System-needed for renaming file etc

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

router.post('/upload',function (req, res, next) {

        var fstream;
        req.pipe(req.busboy);

        var receivedProduct = '';
        req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
	      if(fieldname=='product') receivedProduct=val;
	    });
        req.busboy.on('file', function (fieldname, file, filename, product) {
        	
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            fstream = fs.createWriteStream(__dirname + '/../../../client/assets/images/products/'+receivedProduct+"-"+ filename);
            file.pipe(fstream);
            fstream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
            });
        });
    });



module.exports = router;

