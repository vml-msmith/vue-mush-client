<template>
<div class="world">
  <output-window></output-window>
  <input-window></input-window>
  <div class="windows">
    <dynamic-window v-for="(index, window) in windows" :id="window._id">
    </dynamic-window>
  </div>
<div>
</template>

<script>
import DisplayMessageFactory from './DisplayMessageFactory'
import OutputWindow from './OutputWindow'
import InputWindow from './InputWindow'
import DynamicWindow from './DynamicWindow'

import {WSocket} from '../WebSocket/WSocket'

export default {
  components: {
    OutputWindow,
    InputWindow,
    DynamicWindow
  },

  props: [
    'host',
    'port'
  ],

  data () {
    return {
      wsock: null,
      windows: []
    }
  },

  computed: {
  },

  methods: {
    displayMessage: function (msg) {
      this.$broadcast('displayMessage', msg)
    },

    connect: function () {
      let dMsg = DisplayMessageFactory.systemMessage('Trying to connect...')
      this.displayMessage(dMsg)
      let sock = this.getSocket()
      sock.connect()
    },

    getSocket: function () {
      if (this.wsock === null) {
        this.wsock = new WSocket(this.host, this.port)
        this.wsock.registerListener(this)
      }

      return this.wsock
    },

    send: function (message) {
      let sock = this.getSocket()
      sock.send(message)
    },

    onSocketMessage: function (event) {
      switch (event.event) {
        case 'error':
          this.displayMessage(
            DisplayMessageFactory.systemMessage('Unable to connect to host and port.'))
          break
        case 'close':
          this.displayMessage(
            DisplayMessageFactory.systemMessage('Connection Closed.'))
          break
        case 'open':
          this.displayMessage(
            DisplayMessageFactory.systemMessage('Connection Open.'))
          break
        case 'message':
          let channel = event.message.data[0]
          let data = event.message.data.substring(1)
          switch (channel) {
            case 't':
              if (data.indexOf('window-send') === 0) {
                data = data.substring(11)
                let parsed = ''
                for (var ii = 0, ilen = data.length; ii < ilen; ++ii) {
                  var ch = data.charCodeAt(ii)
                  switch (ch) {
                    case 10: // newline
                      parsed += '\\n'
                      continue
                    case 13: // carriage return
                      parsed += '%0D'
                      continue
                    case 27: // escape
                      parsed += '%1b'
                      continue
                  }
                  parsed += data.substr(ii, 1)
                }

                let json = JSON.parse(parsed)

                if (json.hasOwnProperty('cmd') && json.cmd === 'window') {
                  let window = null
                  for (let i = 0; i < this.windows.length; ++i) {
                    if (this.windows[i]._id === json.window) {
                      window = i
                    }
                  }
                  if (window === null &&
                      json.action !== 'close') {
                    // Create a window.
                    this.windows.push({ _id: json.window })
                    console.log('Create')
                    window = this.windows.length - 1
                  }

                  if (json.action === 'close' &&
                      window !== null) {
                    // Destroy the window
                    this.windows.splice(window, 1)
                  }

                  this.$broadcast('windowUpdate', json.window, json)
                }
              } else {
                this.displayMessage(
                              DisplayMessageFactory.message(data))
              }
              break
            case 'p':
              break
            case 'j':
              let json = JSON.parse(data)
              if (json.hasOwnProperty('cmd') && json.cmd === 'window') {
                let window = null
                for (let i = 0; i < this.windows.length; ++i) {
                  if (this.windows[i].id === json.window) {
                    window = i
                  }
                }
                if (window === null &&
                     json.action !== 'close') {
                  // Create a window.
                  this.windows.push({ id: json.window })
                  console.log('Create')
                  window = this.windows.length - 1
                }

                if (json.action === 'close' &&
                    window !== null) {
                  // Destroy the window
                  delete this.windows[window]
                  console.log('CLOSE')
                }
                console.log('Broadcast')
                this.$broadcast('windowUpdate', json)
              }
              break
            default:
              console.log('Got unhandled channel: ' + channel)
              console.log(data)
              break
          }

          break
        default:
          break
      }
    }
  },

  ready () {
    this.connect()
  },

  events: {
    'sendInput': function (msg) {
      this.displayMessage(DisplayMessageFactory.localEchoMessage(msg))
      this.send(msg)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.world {
  border: 1px solid lightgray;
  margin-top: -1px;
  background: lightgray;
  position: fixed;
  top: 50px;
  bottom: 10px;
  max-width: 95vw;
  min-width: 95vw;
}

@media (min-width: 768px) {
  .world {
    max-width: 695px;
    min-width: 695px;
  }
}

.inner-window {
  color: #fff;
  margin: 4px;
  padding: 5px;
  border-radius: 5px;
}

.windows {
  position: absolute;
  top: 0;
  left: 692px;
}
</style>
