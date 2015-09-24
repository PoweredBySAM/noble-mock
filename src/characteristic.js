import { EventEmitter } from 'events'
import * as _ from 'lodash'

export default class Characteristic extends EventEmitter {
  constructor(uuid, name, socket, ipc) {
    super()
    this.ipc = ipc
    this.socket = socket
    this.uuid = uuid
    this.name = name
    this.ipc.server.on('client:read', this.handleRead.bind(this))
  }

  handleRead(data) {
    let dataParsed;
    try {
      dataParsed = JSON.parse(data);
    } catch(e) {
      console.log("Error parsing incoming data (should be in JSON-parsable format)");
    }

    this.emit("read", new Buffer(dataParsed))
  }

  notify(value) {
    console.log("notify attempt")
  }

  write(value) {
    let valueParsed;
    try {
      valueParsed = value.toJSON();
      // node > 0.10 parse buffers differently
      if (valueParsed.data) {
        valueParsed = valueParsed.data;
      }
    } catch(e) {
      console.log("Error parsing outcoming data (should be in JSON-parsable format");
    }
    this.ipc.server.emit(this.socket, 'client:write', valueParsed || []);
  }

}
