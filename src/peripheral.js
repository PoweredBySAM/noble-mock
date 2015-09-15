import Ipc from 'easy-ipc'
import { EventEmitter } from 'events'
import * as types from './data'
import * as _ from 'lodash'

export default class NoblePeripheral extends EventEmitter {
  constructor(data) {
    super()
    // Object.assign(this, data)
    _.assign(this, data)
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
