class Communicator {
  constructor(target = window.top.Communicator) {
    // init props
    this.target = target
    this.listeners = {}
  }
  // 接受消息
  receive(type, ...opts) {
    const listeners = this.listeners[type]
    if(listeners) {
      listeners.forEach(cb => {
        cb()
      })
    }
  }

  // 发送消息
  send(type, opts) {
    this.target.receive(type, opts)
  }

  on(type, cb) {
    this.listeners[type] = this.listeners[type] || []
    this.listeners[type].push(cb)
  }
}
