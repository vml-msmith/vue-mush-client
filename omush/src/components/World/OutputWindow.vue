<template>
<div class="output-window inner-window">
  <div v-for="msg in history" class="message {{msg.type}}">
    {{ msg.string }}
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      history: [{string: 'test'}]
    }
  },

  methods: {
  },

  events: {
    'displayMessage': function (msg) {
      this.history.push(msg)
       var elem = document.getElementById('data');
       elem.scrollTop = elem.scrollHeight;
    }
  }
}
</script>

<style scoped>
.output-window {
  background: black;
  min-height: 600px;
  max-height: 600px;
  overflow: scroll;
}
.message.input {
  color: darkorange;
}
</style>