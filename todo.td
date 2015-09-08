 
# goal API:

```js
 import createDevice from './device'
 import samDevices from './data'

 const pot = createDevice('RotaryPot')

 pot.turnOn()
 pot.setValue("rotation", 50)
 pot.turnOff()
 pot.simulateConnectionLost [?]
```
 
# TODO:

 - switch to ipc communication
 - design proper device mock api
 - support characteristics [?]
 - better input fomat (real module.js definition?)
 - implement interactive client 



