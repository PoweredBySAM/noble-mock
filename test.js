#!/usr/bin/env node

require('babel/register');
var device = require('./device');
var deviceTypes = require('./device/data.js');

var type = deviceTypes["RotaryPot"];

var pot = device.createDevice("SAM", type);

console.log(pot)
