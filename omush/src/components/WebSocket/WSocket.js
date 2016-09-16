var W3CWebSocket = require('websocket').w3cwebsocket

let _host = Symbol()
let _port = Symbol()
let _socket = Symbol()
let _listeners = Symbol()
let _queuedMessages = Symbol()

function _getSocket (obj) {
  let socket = obj[_socket]
  if (socket === null) {
    let host = obj[_host]
    let port = obj[_port]

    socket = new W3CWebSocket('ws://' + host + ':' + port)
    obj[_socket] = socket

    socket.onerror = function (e) {
      _dispatchMessageToListeners(obj, {
        event: 'error',
        message: 'Connection Error'
      })
    }

    socket.onclose = function (e) {
      _dispatchMessageToListeners(obj, {
        event: 'close',
        message: 'Connection Closed'
      })
    }

    socket.onopen = function (e) {
      _dispatchMessageToListeners(obj, {
        event: 'open',
        message: 'Connection Opened'
      })
    }

    socket.onmessage = function (e) {
      console.log(e)

      _dispatchMessageToListeners(obj, {
        event: 'message',
        message: e
      })
    }
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

export class WSocket {
  constructor (host, port) {
    this[_host] = host
    this[_port] = port
    this[_socket] = null
    this[_listeners] = []
    this[_queuedMessages] = []
  }

  registerListener (listener) {
    this[_listeners].push(listener)
  }

  connect () {
    _getSocket(this)
  }

  send (message) {
    this[_queuedMessages].push(message)

    if (this[_socket].readyState === this[_socket].OPEN) {
      while (this[_queuedMessages].length > 0) {
        let msg = this[_queuedMessages].pop()
        this[_socket].send(msg)
      }
    }
  }

  disconnect () {
  }

}
