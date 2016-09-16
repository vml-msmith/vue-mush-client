<template>
<div class="world-tab {{classes}}">
{{name}}
<div>
</template>

<script>
export default {
  props: [
    'name',
    'isActive'
  ],
  data () {
    return {
    }
  },
  computed: {
    classes: function () {
      if (this.isActive) {
        return 'active'
      }

      return ''
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.world-tab {
  border: 1px solid lightgray;
  padding: 2px;
  display: inline-block;
  background: darkgray;
  cursor: pointer;
}
.active {
  background: lightgray;
}
</style>
