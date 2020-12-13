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

declare class BalanceBoard {
  on(event: 'data', listener: (data: BalanceBoardData) => void): void
  removeListener(event: 'data', listener: (data: BalanceBoardData) => void): void
  isConnected(): boolean
  connect(): void
  disconnect(): void
}

export = BalanceBoard
