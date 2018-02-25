var W3CWebSocket = require('websocket').w3cwebsocket

let _host = Symbol()
let _port = Symbol()
let _socket = Symbol()
let _listeners = Symbol()
let _queuedMessages = Symbol()
let _readyState = Symbol()

const CONNECTING = 0
const OPEN = 1
// const CLOSING = 2
const CLOSED = 3

function _getSocket (obj) {
  let socket = obj[_socket]
  if (socket === null) {
    obj[_readyState] = CONNECTING

    let host = obj[_host]
    let port = obj[_port]

    socket = new W3CWebSocket('ws://' + host + ':' + port + '/wsclient')
    obj[_socket] = socket

    socket.onerror = function (e) {
      obj[_readyState] = CLOSED
      _dispatchMessageToListeners(obj, {
        event: 'error',
        message: 'Connection Error'
      })
      obj[_socket] = null
    }

    socket.onclose = function (e) {
      obj[_readyState] = CLOSED
      _dispatchMessageToListeners(obj, {
        event: 'close',
        message: 'Connection Closed'
      })
      obj[_socket] = null
    }

    socket.onopen = function (e) {
      _dispatchMessageToListeners(obj, {
        event: 'open',
        message: 'Connection Opened'
      })
      obj[_readyState] = OPEN
      _processSendQueue(obj)
    }

    socket.onmessage = function (e) {
      _dispatchMessageToListeners(obj, {
        event: 'message',
        message: e
      })
    }
  } else {
    obj[_socket].open(true)
  }

  return socket
}

function _dispatchMessageToListeners (obj, message) {
  obj[_listeners].forEach(v => {
    _dispatchMessage(v, message)
  })
}

function _dispatchMessage (listener, message) {
  if (typeof listener.onSocketMessage !== 'function') {
    return
  }

  listener.onSocketMessage(message)
}

function _processSendQueue (obj) {
  while (obj[_queuedMessages].length > 0) {
    let msg = obj[_queuedMessages].pop()

    obj[_socket].send('t' + msg + '\r\n')
  }
}

export class WSocket {
  constructor (host, port) {
    this[_host] = host
    this[_port] = port
    this[_socket] = null
    this[_listeners] = []
    this[_queuedMessages] = []
    this[_readyState] = CLOSED
  }

  registerListener (listener) {
    this[_listeners].push(listener)
  }

  connect () {
    _getSocket(this)
  }

  send (message) {
    this[_queuedMessages].push(message)

    let readyState = this[_readyState]

    if (readyState === OPEN) {
      _processSendQueue(this)
    } else if (this[_readyState] === CLOSED) {
      this.connect()
    }
  }

  disconnect () {
  }

}
