/*
 *  Copyright (c) 2014 The WebRTC project authors. All Rights Reserved.
 *
 *  Use of this source code is governed by a BSD-style license
 *  that can be found in the LICENSE file in the root of the source
 *  tree.
 */

/* More information about these options at jshint.com/docs/options */
// Variables defined in and used from main.js.
/* globals randomString, AppController, sendAsyncUrlRequest, parseJSON */
/* exported params */
'use strict';


// Generate random room id and connect.
var roomServer = 'http://172.16.3.11:8080';

// example request


var loadingParams = {
  errorMessages: [],
  warningMessages: [],
  suggestedRoomId: randomString(9),
  roomServer: roomServer,
  connect: false,
  paramsFunction: function() {
    return new Promise(function(resolve, reject) {
      trace('Initializing; retrieving params from: ' + roomServer + '/params');
      sendAsyncUrlRequest('GET', roomServer + '/params').then(function(result) {
        var serverParams = parseJSON(result);
        console.log(serverParams);
        var newParams = {};
        // if (!serverParams) {
        //   resolve(newParams);
        //   return;
        // }



        // Convert from server format to expected format.
        newParams.isLoopback = 'false';
        newParams.mediaConstraints = parseJSON("{\"video\": true, \"audio\": true}");
        newParams.offerOptions = parseJSON("{}");
        newParams.peerConnectionConfig = parseJSON("{\"rtcpMuxPolicy\": \"require\", \"iceServers\": [{\"credential\": \"123456\", \"username\": \"sujon\", \"urls\": [\"turn:172.16.3.11:3478?transport=udp\", \"turn:172.16.3.11:3478?transport=tcp\"]}, {\"urls\": [\"stun:stun.l.google.com:19302\"]}], \"bundlePolicy\": \"max-bundle\"}");
        newParams.peerConnectionConstraints =
            parseJSON("{\"optional\": []}");
        newParams.iceServerRequestUrl = "https://networktraversal.googleapis.com/v1alpha/iceconfig?key=none";
        newParams.iceServerTransports = "";
        newParams.wssUrl = "ws://172.16.3.11:8089/ws";
        newParams.wssPostUrl = "http://172.16.3.11:8089";
        newParams.versionInfo = parseJSON("{\"branch\": \"master\", \"gitHash\": \"20cdd7652d58c9cf47ef92ba0190a5505760dc05\", \"time\": \"Fri Mar 9 17:06:42 2018 +0100\"}");
        newParams.messages = [];

        trace('Initializing; parameters from server: ');
        trace(JSON.stringify(newParams));
        resolve(newParams);
      }).catch(function(error) {
        trace('Initializing; error getting params from server: ' +
            error.message);
        reject(error);
      });
    });
  }
};

new AppController(loadingParams);