import * as _ from 'lodash'
import * as lodashDeep from 'lodash-deep'

_.mixin(lodashDeep)

export default function parseDeviceData(deviceData) {

  let targets = {}

  _.deepMapValues(deviceData, (typeProp, path) => {
    const lastKey = path.pop()
    if (lastKey == 'type') {
      const accessRoot = path.join('.')
      const value = _.get(deviceData, accessRoot + '.data')
      const newValue = parseValueByType(value, typeProp)
      targets[accessRoot] = newValue
    }
  })

  _.forOwn(targets, (value, key) => {
    _.set(deviceData, key, value)
  })

  return deviceData
}

const parseValueByType = (data, type) => {
  switch (type) {
    case 'Buffer':
      console.log("parsing:", data)
      return new Buffer(data)
      break
    default:
      throw "Unknown data type received: " + type
  }
}
