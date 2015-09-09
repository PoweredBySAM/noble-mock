import EventEmitter from 'events'
import ipc from 'node-ipc';

import * as types from './data'
import NoblePeripheral from './peripheral'

ipc.config.id = 'noblemock';
ipc.config.retry = 1500;

const VIRTUAL = "virtual"

const createPeripheral = (type) => {
  const deviceType = types[type]
  const device = new NoblePeripheral(deviceType)
  return device;
}

class NobleMock extends EventEmitter {
  constructor(isVirtual) {
    console.log("creating noble mock")
    super()
    this._peripherals = []

    ipc.serve(() => {
      ipc.server.on('message', (data, socket) => {
        ipc.log('got msg:'.debug, data)
        ipc.server.emit(socket, 'message', data + ' noblemock')
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
}

export default function(virtual) {
  console.log(virtual)
  return new NobleMock(virtual == VIRTUAL)
};
