import { Node, NodeAPI, NodeDef } from 'node-red'
import BalanceBoard from 'wii-balance-board-pi'

const DELAY = 2000

interface WiiBalanceBoardNodeDef extends NodeDef {
  topic: string
}

interface WiiBalanceBoardNode extends Node {
  topic: string
}

module.exports = (RED: NodeAPI) => {
  function WiiBalanceBoard(this: WiiBalanceBoardNode, props: WiiBalanceBoardNodeDef) {
    RED.nodes.createNode(this, props)
    this.topic = props.topic

    setTimeout(() => {
      this.status({ fill: 'yellow', text: 'connecting...' })

      const balance = new BalanceBoard()
      balance.connect()

      balance.on('data', (data) => {
        if (data.connected) {
          this.status({ fill: 'green', text: 'wii-balance-board connected.' })
          const msg = { topic: this.topic, payload: data }
          this.send(msg)
        }
      })
      this.on('close', (done: () => void) => {
        this.status({ fill: 'yellow', text: 'wii-balance-board disconnected.' })
        balance.disconnect()
        done()
      })
    }, DELAY)
  }
  RED.nodes.registerType('wii-balance-board', WiiBalanceBoard)
}
