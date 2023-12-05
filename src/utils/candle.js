export default class candle {
  constructor(openTime, open, high, low, close) {
    this.x = new Date(openTime);
    this.y = [
      parseFloat(open).toFixed(6),
      parseFloat(high).toFixed(6),
      parseFloat(low).toFixed(6),
      parseFloat(close).toFixed(6),
    ];
  }
}
