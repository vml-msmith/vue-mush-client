export class DisplayMessage {
  constructor (msg, type) {
    this.string = msg
    this.type = type
  }
  getString () { return this.string }
  getType () { return this.type }
}
