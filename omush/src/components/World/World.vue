<template>
<div class="world">
  <output-window></output-window>
  <input-window></input-window>
<div>
</template>

<script>
import DisplayMessageFactory from './DisplayMessageFactory'
import OutputWindow from './OutputWindow'
import InputWindow from './InputWindow'

import {WSocket} from '../WebSocket/WSocket'

export default {
  components: {
    OutputWindow,
    InputWindow
  },

  props: [
    'host',
    'port'
  ],

  data () {
    return {
      wsock: null
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
          this.displayMessage(
            DisplayMessageFactory.message(event.message.data))
          break
        default:
          // console.log('Default message: ' + event.message)
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
  background: lightgray

}

.inner-window {
  color: #fff;
  margin: 4px;
  padding: 5px;
  border-radius: 5px;
}
</style>
