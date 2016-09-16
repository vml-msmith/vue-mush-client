const privateProps = new WeakMap()

export class WSocket {
  constructor (host, port) {
    privateProps(this, {
      host: host,
      port: port,
      socket: null
    })
  }

  connect () {
    if (this.socket === null) {
      this.socket = new WebSocket('ws://' + this.host + ':' + this.port);
    }
  }

  disconnect () {
  }


}
