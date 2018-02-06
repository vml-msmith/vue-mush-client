<template>
<div class="output-window inner-window">
  <div v-for="msg in history" class="message {{msg.getType()}}">
  <span v-html="msg.getString()"></span>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      history: []
    }
  },

  methods: {
  },

  events: {
    'displayMessage': function (msg) {
      if (typeof msg.getString === 'function' &&
         typeof msg.getType === 'function') {
        this.history.push(msg)
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
.output-window {
  background: black;
  min-height: 600px;
  max-height: 750px;
  overflow-y: scroll;
}
.message.localEcho {
  color: darkorange;
}
.message.system {
  color: cyan;
}
</style>
