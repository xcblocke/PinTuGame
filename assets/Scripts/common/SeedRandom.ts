export class SeedRandom {
  seed = null;
  constructor(e) {
    this.seed = e;
  }
  Random() {
    this.seed = (9301 * this.seed + 49297) % 233280;
    return this.seed / 233280;
  }
}