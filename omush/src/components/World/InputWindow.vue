<template>
<div class="input-window inner-window">
  <textarea v-model="input" v-on:keydown="keypress" v-on:keydown.enter.prevent="submit"></textarea>
</div>
</template>

<script>
export default {
  data () {
    return {
      input: '',
      history: [],
      historyIndex: null
    }
  },

  methods: {
    submit: function () {
      if (this.input.trim().length === 0) {
        return
      }
      let input = this.input
      this.history.push(input)
      this.historyIndex = null
      this.input = ''

      this.$dispatch('sendInput', input)
    },

    keypress: function (e) {
      if (e.key === 'ArrowUp') {
        this.arrowUp(e)
      } else
      if (e.key === 'ArrowDown') {
        this.arrowDown(e)
      }
    },

    arrowUp: function (e) {
      if (this.history.length === 0) {
        return
      }

      if (this.isInputAtEnd(e) === false) {
        return
      }

      this.decrementHistoryIndex()
      this.setInput(e.target, this.getHistoryByIndex())
    },

    arrowDown: function (e) {
      if (this.historyIndex === null) {
        return
      }

      if (this.isInputAtEnd(e) === false) {
        return
      }

      this.incrementHistoryIndex()
      this.setInput(e.target, this.getHistoryByIndex())
    },

    isInputAtEnd: function (e) {
      if (e.target.selectionStart === e.target.selectionEnd) {
        return e.target.selectionStart === e.target.textLength
      }
      return false
    },

    decrementHistoryIndex: function () {
      if (this.historyIndex === null) {
        this.historyIndex = this.history.length
      }

      if (this.historyIndex !== 0) {
        --this.historyIndex
      }
    },

    incrementHistoryIndex: function () {
      if (this.historyIndex === this.history.length - 1) {
        this.historyIndex = null
        return
      }

      ++this.historyIndex
    },

    getHistoryByIndex: function () {
      if (this.historyIndex === null) {
        return ''
      }

      return this.history[this.historyIndex]
    },

    setInput: function (target, string) {
      this.input = string
      target.value = string
      target.selectionStart = target.value.length
      target.selectionStart = target.value.length
      setTimeout(function () { target.selectionStart = target.selectionEnd = target.value.length }, 0)
    }
  }

}
</script>

<style scoped>
.input-window {
  background: black;
  min-height: 18px;
  color: lightgray;
}

textarea {
  background: black;
  border: 0;
  color: #fff;
  width: 100%;
  font-size: 14px;
  font-family: Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera;
  height: 180px;
}

textarea:focus {
  outline: 0;
}
</style>
