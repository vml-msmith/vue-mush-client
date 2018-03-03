<template>
<div class="output-window inner-window" roll="log" role="status">
  <div v-for="msg in history" class="message {{msg.getType()}}">
  {{{ msg.getString() }}}
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      history: [],
      scrollBottom: 1,
      setup: 0
    }
  },

  methods: {
    handleScroll () {
      if (Math.abs((this.$el.scrollHeight - this.$el.offsetHeight) - this.$el.scrollTop) < 1) {
        this.scrollBottom = 1
      } else {
        this.scrollBottom = 0
      }
    }
  },

  created () {
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
      if (!this.setup) {
        this.$el.addEventListener('scroll', this.handleScroll)
        this.setup = 1
      }

      if (this.scrollBottom) {
        this.$el.scrollTop = this.$el.scrollHeight
      }
    }
  }
}
</script>

<style scoped>
.output-window {
  background: black;
  height: 80%;
  overflow-y: scroll;
}
.message {
  width: 100%;
}
.message.localEcho {
  color: darkorange;
}
.message.system {
  color: cyan;
}


</style>
