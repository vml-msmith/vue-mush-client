var ansi2html = require('ansi2html')
// var sanitizeHtml = require('sanitize-html')

function escapeHtml (text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  return text.replace(/[&<>"']/g, function (m) { return map[m] })
}

export class DisplayMessage {
  constructor (msg, type) {
    this.string = ansi2html(escapeHtml(msg))
    this.type = type
  }
  getString () { return this.string }
  getType () { return this.type }
}
