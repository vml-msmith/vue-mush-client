<template>
<div class="dynamic-window inner-window">
{{ id }}
  <div v-for="msg in history" class="message {{msg.getType()}}">
  {{{ msg.getString() }}}
  </div>
</div>
</template>

<script>
import DisplayMessageFactory from './DisplayMessageFactory'

export default {
  data () {
    return {
      history: []
    }
  },

  props: [
    'id'
  ],

  events: {
    'windowUpdate': function (id, json) {
      if (id !== this.id) {
        return
      }
      let action = json.action
      console.log('Action ' + action)
      switch (action) {
        case 'draw':
          console.log('draw')
          this.history = []
          this.history.push(DisplayMessageFactory.message(json.data))
          break
        case 'clear':
          this.history = []
          break
        default:
          break
      }

      var max = 2000
      if (this.history != null && this.history.length > max) {
        this.history = this.history.slice(max / 2)
      }
    }
  },
  watch: {
    'history': function (val) {
      this.$el.scrollTop = this.$el.scrollHeight
    }
  }
}
</script>

<style scoped>
.dynamic-window {
  background: black;
  overflow-y: scroll;
  width: 685px;
}
.message {
  width: 680px;
}
.message.localEcho {
  color: darkorange;
}
.message.system {
  color: cyan;
}
.message > div{
  white-space: pre;
}


</style>
