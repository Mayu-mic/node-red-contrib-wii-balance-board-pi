declare module 'wii-balance-board-pi' {
  interface BalanceBoardData {
    connected: boolean
    topLeft: number
    topRight: number
    bottomLeft: number
    bottomRight: number
    totalWeight: number
    buttonPressed: boolean
    buttonReleased: boolean
  }

  class BalanceBoard {
    connect: () => void
    on(event: 'data', listener: (data: BalanceBoardData) => void): void
    removeListener(event: 'data', listener: (data: BalanceBoardData) => void): void
    isConnected(): boolean
    disconnect(): void
  }

  export default BalanceBoard
}
