<template>
<div class="output-window inner-window">
  <div v-for="msg in history" class="message {{msg.getType()}}">
  {{ msg.getString() }}
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
  max-height: 600px;
  overflow-y: scroll;
}
.message.localEcho {
  color: darkorange;
}
.message.system {
  color: cyan;
}
</style>
