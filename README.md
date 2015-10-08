# noble-mock

noble-mock mimics basic API's and behaviours of noble.js to allow
automated or manual testing without using real BLE device.

this is the server part of the mock. the client part 
is located at: [noble-mock-device](http://github.com/PoweredBySAM/noble-mock-device)

communication happens over an IPC channel.

# building

`npm run build`

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

# reflected api's:

  - noble.startScanning()
  - noble.stopScanning()
  - noble.on()
  - noble.addPeripheral()

  - peripheral.characteristics
  - peripheral.discoverSomeServicesAndCharacteristics()
  - peripheral.updateRssi()
  - peripheral.connect()
  - peripheral.disconnect()
(peripheral gets extended with client data sent over ipc channel when connection is estabilished)

  - characteristic.write()
  - characteristic.on()
  - characteristic.notify()
