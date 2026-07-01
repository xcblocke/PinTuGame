class n {
  recordEventTime = 0;
  serverTimeSec = 0;
  set ServerTime(e) {
    this.serverTimeSec = e;
    this.recordEventTime = new Date().getTime();
  }
  get NowServerTimeSec() {
    return this.serverTimeSec + (new Date().getTime() - this.recordEventTime) / 1000;
  }
  checkIsTimeOut(e) {
    return this.NowServerTimeSec > e;
  }
  getRemainTime(e) {
    return e - this.NowServerTimeSec;
  }
}
export var timeTool = new n();