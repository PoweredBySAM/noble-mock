#!/usr/bin/env node

require('babel/register');
var device = require('./device');

var pot = device.createDevice("RotaryPot");

console.log(pot)
