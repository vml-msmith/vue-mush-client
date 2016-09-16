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
    }
  },
  computed: {
  },
  methods: {
    displayMessage: function (msg) {
      console.log(typeof msg)
      this.$broadcast('displayMessage', msg)
    }
  },
  ready () {
    let dMsg = DisplayMessageFactory.systemMessage('Trying to connect...')
    this.displayMessage(dMsg)
  },
  events: {
    'sendInput': function (msg) {
      this.displayMessage(DisplayMessageFactory.localEchoMessage(msg))
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
