#!/usr/bin/env node

require('babel/register');
var device = require('./device');

var pot = device.createDevice("SAM", "RotaryPot");

console.log(pot)
