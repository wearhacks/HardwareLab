/**
 * Created by nadim54321 on 2015-05-07.
 */

angular.module('hardwarelabApp')
  .controller('CreateRentalCtrl', function ($scope, $modalInstance,reservation, Modal, productService) {

    'use strict';

    $scope.modalError = Modal.confirm.errorMessage();
    $scope.modalSuccess = Modal.confirm.successMessage();

    $scope.reservation = reservation;
    var _video = null,
      patData = null;

    $scope.patOpts = {x: 0, y: 0, w: 25, h: 25};

    // Setup a channel to receive a video property
    // with a reference to the video element
    // See the HTML binding in main.html
    $scope.myChannel = {
      // the fields below are all optional
      videoHeight: 400,
      videoWidth: 300,
      video: null // Will reference the video element on success
    };

    $scope.webcamError = false;
    $scope.onError = function (err) {
      $scope.$apply(
        function() {
          $scope.webcamError = err;
        }
      );
    };

    $scope.onSuccess = function () {
      console.log($scope.myChannel);
      // The video element contains the captured camera data
      _video = $scope.myChannel.video;
      $scope.$apply(function() {
        $scope.patOpts.w = _video.width;
        $scope.patOpts.h = _video.height;
        $scope.showDemos = true;
      });
    };

    $scope.onStream = function (stream) {
      // You could do something manually with the stream.
    };


    $scope.addRental = function(reservation) {
      console.log(reservation)
      productService.addRental(reservation)
        .success(function(message) {
          $scope.modalSuccess("Created a new rental successfully");
          $modalInstance.close();
        })
        .error(function(message) {
          $scope.modalError(message.error);
        });
    };
    /**
     * Make a snapshot of the camera data and show it in another canvas.
     */
    $scope.makeSnapshot = function makeSnapshot() {
      if (_video) {
        var patCanvas = document.querySelector('#snapshot');
        if (!patCanvas) return;

        patCanvas.width = _video.width;
        patCanvas.height = _video.height;
        var ctxPat = patCanvas.getContext('2d');

        var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $scope.patOpts.w, $scope.patOpts.h);
        ctxPat.putImageData(idata, 0, 0);

        sendSnapshotToServer(patCanvas.toDataURL());

        patData = idata;
      }
    };

    /**
     * Redirect the browser to the URL given.
     * Used to download the image by passing a dataURL string
     */
    $scope.downloadSnapshot = function downloadSnapshot(dataURL) {
      window.location.href = dataURL;
    };

    var getVideoData = function getVideoData(x, y, w, h) {
      var hiddenCanvas = document.createElement('canvas');
      hiddenCanvas.width = _video.width;
      hiddenCanvas.height = _video.height;
      var ctx = hiddenCanvas.getContext('2d');
      ctx.drawImage(_video, 0, 0, _video.width, _video.height);
      return ctx.getImageData(x, y, w, h);
    };

    /**
     * This function could be used to send the image data
     * to a backend server that expects base64 encoded images.
     *
     * In this example, we simply store it in the scope for display.
     */
    var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
      $scope.snapshotData = imgBase64;
      $scope.reservation.imageData = imgBase64;
    };


    (function() {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();


    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
