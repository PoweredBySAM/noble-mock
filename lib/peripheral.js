import Ipc from 'easy-ipc'
import EventEmitter from 'events'
import * as types from './data'

export const createPeripheral = (type) => {
  // TODO: get peripheral data from device
  const deviceType = types[type]
  const device = new NoblePeripheral(deviceType)
  return device
}

export class NoblePeripheral extends EventEmitter {
  constructor(device) {
    super()
    Object.assign(this, device)
    this.ipc = new Ipc({
      socketPath: '/tmp/noble-mock.sock'
    })
    this.ipc.on('connect', (connection) => {
      connection.write({data: 'connected'})
    })
  }

  discoverSomeServicesAndCharacteristics() {
    console.log("TODO: discover some services")
  }
  connect() {
    this.emit("connect", null);
    console.log("peripheral connected.")
  }
  disconnect() {
    console.log("peripheral disconnected.")
  }

}
