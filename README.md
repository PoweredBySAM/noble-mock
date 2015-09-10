# noble-mock

noble-mock replicates basic APIs and behaviour's of noble.js to allow
automated or manual testing without using real BLE device. it comes in two parts:

noble-mock itself (lib/) - 'noble server' mock that is instantiated instead of noble on an app level
virtual device (device/) - 'client' part, exposing APIs for testing. will be separated to another module at some point.

communication happens over IPC channel.

# usage

server part:
```js
if (process.env.NOBLE_MOCK) {
  // `AppNamespace` is a namespace for IPC channel
  noble = require('noble-mock')('AppNamespace');
} else {
  noble = require('noble');
}
```

client part:
```js
require('babel/register'); // needed for es6 transpilation

var device = require('./device');

// device type definition
const myDeviceData = {
  advertisement: {
    localName: 'MyDevice Name',
    manufacturerData: new Buffer('xxxxxxxxxxxx','hex')
  }
}

var myDevice = device.createDevice('AppNamespace', myDeviceData);

// `myDevice` will now expose APIs for testing (TODO)
```

