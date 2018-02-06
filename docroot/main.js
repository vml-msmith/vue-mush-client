// main.js
import Vue from 'vue'

import App from './components/App'

// mount a root Vue instance
new Vue({
  el: 'body',
  components: {
    // include the required component
    // in the options
    app: App
  }
})
