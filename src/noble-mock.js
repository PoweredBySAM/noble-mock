import { EventEmitter } from 'events'

import ipc from 'node-ipc'

import * as types from './data'
import NoblePeripheral from './peripheral'
import parseDeviceData from './parser'

ipc.config.id = 'noblemock'
ipc.config.retry = 1500

const createPeripheral = (data) => {
  let dataParsed = parseDeviceData(data)
  const peripheral = new NoblePeripheral(dataParsed)
  return peripheral;
}

class NobleMock extends EventEmitter {
  constructor(namespace) {
    super()
    ipc.config.appspace = namespace + "." || "noname."
    console.log("creating noble mock")
    this._peripherals = []

    ipc.serve(() => {
      ipc.server.on('connect', (a, b) => {
      })
      ipc.server.on('client:connected', (data, socket) => {
        // TODO: bind client sockets to noblePeripheral objects
        this.addClient(data, socket)
      })
      ipc.server.on('client:change', (data, socket) => {
        // TODO: handle value change
        this.updateClient(data, socket)
      })
      ipc.server.on('client:disconnected', (data, socket) => {
        // TODO: handle manual disconnect
        // this.removeClient(data, socket)
        this.removeAllClients();
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
    // console.log("on:", arguments)
    super.on(...arguments)
  }
  addPeripheral(peripheral) {
    this._peripherals.push(peripheral)
  }
  start() {
    this.emit("stateChange", "poweredOn")
  }
  discover() {
    console.log("starting fake discovery")
    setInterval(this.fakeDiscover.bind(this), 1000)
  }
  fakeDiscover() {
    this._peripherals.forEach((p) => { this.emit("discover", p) } )
  }
  addClient(client, socket) {
    console.log("adding client:", client)
    const peripheral = createPeripheral(client)
    this._peripherals.push(peripheral)
  }
  updateClient(client, socket) {
    console.log("update client")
  }
  removeClient(client, socket) {
    console.log("remove client")
  }
  removeAllClients() {
    this._peripherals = []
  }
}

export default function(namespace) {
  return new NobleMock(namespace)
}
