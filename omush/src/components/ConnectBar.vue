<template>
  <form v-on:submit.prevent="tryToSubmit">
    <label>Hostname:</label>
    <input :placeholder="defaultHost" type="text" v-model="host">
    <label>Port:</label>
    <input :placeholder="defaultPort" type="text" v-model="port" number>
    <input type="submit" value="Connect">
  </form>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!',
      defaultPort: 1701,
      defaultHost: 'localhost',
      host: '',
      port: null
    }
  },
  computed: {
    connectHost: function () {
      if (this.host.length === 0) {
        return this.defaultHost
      }

      return this.host
    },
    connectPort: function () {
      if (this.port === null) {
        return this.defaultPort
      }

      return this.port
    }
  },
  methods: {
    tryToSubmit () {
      let port = this.connectPort
      let host = this.connectHost

      this.$dispatch('tryOpenConnection', {port: port, host: host})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
