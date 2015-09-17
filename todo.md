 
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

 - design proper device mock api
 - support characteristics [?]
 - implement interactive client 

 # e2e:

 - turn on, appear in live sams
 - turn off, disappear
