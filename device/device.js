import Ipc from 'easy-ipc'
import EventEmitter from 'events'
import * as types from './data'

export const createDevice = (type) => {
  const deviceType = types[type]
  const device = new Device(deviceType)
  return device
}

export class Device extends EventEmitter {
  constructor(device) {
    super()
    Object.assign(this, device)
    this.ipc = new Ipc({
      socketPath: '/tmp/noble-mock.sock'
    })
    this.ipc.on('connect', (connection) => {
      this.connection = connection
      connection.write({data: 'connected'})
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
