'use strict';

require('./server/services/mongoose');
const express = require('./server/services/express');
const http = require('http').Server(express);
const io = require('socket.io')(http);

http.listen(3000);
