<template>
<div class="world">
  <output-window></output-window>
  <input-window></input-window>
<div>
</template>

<script>
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
  },
  events: {
    'sendInput': function (msg) {
      this.$broadcast('displayMessage', { string: msg, type: 'input' })
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
