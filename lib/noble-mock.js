import EventEmitter from 'events'

import ipc from 'node-ipc'

import * as types from './data'
import NoblePeripheral from './peripheral'
import parseDeviceData from './parser'

ipc.config.id = 'noblemock'
ipc.config.retry = 1500


const VIRTUAL = "virtual"


const createPeripheral = (data) => {
  data = parseDeviceData(data)
  const peripheral = new NoblePeripheral(data)
  return peripheral;
}

class NobleMock extends EventEmitter {
  constructor(isVirtual) {
    console.log("creating noble mock")
    super()
    this._peripherals = []

    ipc.serve(() => {
      ipc.server.on('connect', (a, b) => {
      })
      ipc.server.on('client:connected', (data, socket) => {
        // TODO: bind client sockets to noblePeripheral objects
        // ipc.server.emit(socket, 'message', data + ' noblemock')
        this.addClient(data, socket)
      })
      ipc.server.on('client:change', (data, socket) => {
        // TODO: handle value change
        this.updateClient(data, socket)
      })
      ipc.server.on('client:disconnected', (data, socket) => {
        // TODO: handle manual disconnect
        this.removeClient(data, socket)
      })
    })
    ipc.server.start()

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
  addClient(client, socket) {
    console.log("add client:", client)
    const peripheral = createPeripheral(client)
    this._peripherals.push(peripheral)
  }
  updateClient(client, socket) {
    console.log("update client")
  }
  removeClient(client, socket) {
    console.log("remove client")
  }
}

export default function(virtual) {
  console.log(virtual)
  return new NobleMock(virtual == VIRTUAL)
};
