<template>
  <div id="app">
    <connect-bar></connect-bar>
    <world-tab v-for="(index, world) in worlds" :name="world.host + ' ' + world.port" :is-active="index === activeWorld" v-on:click="selectWorld(index)"></world-tab>
    <world v-for="(index, world) in worlds" :host="world.host" :port="world.port" v-show="index === activeWorld">
    </world>
  </div>
</template>

<script>
import ConnectBar from './components/ConnectBar'
import World from './components/World/World.vue'
import WorldTab from './components/WorldTab'

export default {
  components: {
    ConnectBar,
    World,
    WorldTab
  },
  data () {
    return {
      worlds: [],
      activeWorld: null
    }
  },
  methods: {
    'selectWorld': function (index) {
      this.activeWorld = index
    }
  },
  events: {
    'tryOpenConnection': function (msg) {
      this.worlds.push(msg)
      if (this.activeWorld === null) {
        this.activeWorld = 0
      }
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  color: #2c3e50;
  font-family: "Lucida Sans Unicode", "Lucida Grande", sans-serif;
  font-size: 14px;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
