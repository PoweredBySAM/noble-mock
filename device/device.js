
import EventEmitter from 'events'
import ipc from 'node-ipc'
import * as types from './data'

ipc.config.id = 'device-client'
ipc.config.retry = 1500

export const createDevice = (type) => {
  const deviceType = types[type]
  const device = new Device(deviceType)
  return device
}

export class Device extends EventEmitter {
  constructor(device) {
    super()
    Object.assign(this, device)
    ipc.connectTo('noblemock', () => {
      ipc.of.noblemock.on('connect', () => {
        ipc.log('connected to mock'.rainbow, ipc.config.delay)
        ipc.of.noblemock.emit('message', 'hello')
      })
      ipc.of.noblemock.on('disconnect', () => {
        ipc.log('disconnected from mock'.notice)
      })
      ipc.of.noblemock.on('message', (data) => {
        ipc.log('message:'.debug, data)
      })
    })
  }
  turnOn() {
    if (!this.connection) {
      throw "No IPC connection"
    }
    connection.write({event: 'turnedOn'})
  }

  turnOff() {
    if (!this.connection) {
      throw "No IPC connection"
    }
    connection.write({event: 'turnedOff'})
  }


}
