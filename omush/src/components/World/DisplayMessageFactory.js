import {DisplayMessage} from './DisplayMessage'

const DisplayMessageFactory = {
  systemMessage (msg) {
    let response = new DisplayMessage(msg, 'system')
    return response
  },
  localEchoMessage (msg) {
    let response = new DisplayMessage(msg, 'localEcho')
    return response
  }
}

export default DisplayMessageFactory
