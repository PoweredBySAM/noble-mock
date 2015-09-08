import createDevice from './device'
import samDevices from './data'

const pot = createDevice('RotaryPot')

pot.turnOn()
pot.setValue("rotation", 50)
pot.turnOff()
pot.simulateConnectionLost ?
