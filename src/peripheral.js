import { EventEmitter } from 'events'
import * as _ from 'lodash'
import Characteristic from './characteristic'

const createCharacteristics = (chars, socket, ipc) => {
  return _.map(chars, (value, key) => {
    return new Characteristic(value, key, socket, ipc)
  })
}

export default class NoblePeripheral extends EventEmitter {
  constructor(data, socket, ipc) {
    super()
    _.assign(this, data)
    this.ipc = ipc
    this.socket = socket
    this.characteristics = createCharacteristics(this.uuids, socket, ipc)
  }

  discoverSomeServicesAndCharacteristics(services, characteristics, callback) {
    callback(null, this.characteristics, this.characteristics);
  }

  updateRssi(callback) {
    this.rssi = 100
    callback(null, this.rssi)
  }
  connect() {
    this.emit("connect", null);
    console.log("peripheral connected.")
  }
  disconnect() {
    console.log("peripheral disconnected.")
  }
}
