#!/usr/bin/env node

require('babel/register');
// var device = require('./device');
var device = require('./device-out/device.js');
var deviceTypes = require('./device/data.js');

var type = deviceTypes["RotaryPot"];

var pot = device.createDevice("SAM", type);

console.log(pot)
