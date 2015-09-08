import EventEmitter from 'events'
import Ipc from 'easy-ipc'

import * as types from './data'
import NoblePeripheral from './peripheral'

const VIRTUAL = "virtual"

const createPeripheral = (type) => {
  const deviceType = types[type]
  const device = new NoblePeripheral(deviceType)
  return device;
}

class NobleMock extends EventEmitter {
  constructor(isVirtual) {
    super()
    this._peripherals = []
    this.ipc = new Ipc({
      socketPath: '/tmp/noble-mock.sock'
    })
    this.ipc.on('listening', (server) => {
      this.ipc.on('connection', (connection, server) => {
        this._peripherals.push(connection)
      })

      this.ipc.on('data', (data, connection, server) => {
        console.log("data in:", data)
      })
    })
    setTimeout(this.start.bind(this), 10)
  }
  startScanning() {
    console.log("noble startScanning")
    setTimeout(this.discover.bind(this), 1000)
  }
  stopScanning() {
    console.log("noble stopScanning")
  }
  on() {
    console.log("on:", arguments)
    super.on(...arguments)
  }
  addPeripheral(peripheral) {
    this._peripherals.push(peripheral)
  }
  start() {
    this.emit("stateChange", "poweredOn")
  }
  discover() {
    console.log("--------- discover!")
    setInterval(this.fakeDiscover.bind(this), 1000)
    // this.emit("discover", createPeripheral("RotaryPot"));
  }
  fakeDiscover() {
    this._peripherals.forEach((p) => { this.emit("discover", p) } )
  }
}

export default function(virtual) {
  console.log(virtual)
  return new NobleMock(virtual == VIRTUAL)
};
