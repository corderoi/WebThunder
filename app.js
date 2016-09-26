//
// app.js
// WebThunder
//
// Created by Ian Cordero on 9/25/16.
// Copyright (c) 2016 Ian Cordero. All rights reserved.
//

'use strict';

const express = require('express'),
    app = express();

// Configuration constants
const portNum = 8123,
    webPath = "/web";

(function main() {
    app.use(express.static(__dirname + webPath));

    app.listen(portNum, () => {
        console.log("Server listening on port "
            + portNum + ".");
    });
})();

