<template>
<div class="input-window inner-window">
<textarea v-model="input" v-on:keyup.enter="submit"></textarea>
</div>
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  },

  methods: {
    submit: function () {
      let input = this.input
      this.input = ''
      this.$dispatch('sendInput', input)
      console.log('Dispatch')
    }
  }

}
</script>

<style scoped>
.input-window {
  background: black;
  min-height: 18px;
  color: #fff;
}

textarea {
  background: black;
  border: 0;
  color: #fff;
  width: 100%;
}
</style>