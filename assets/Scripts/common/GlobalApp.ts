class n {
  _GameMain = null;
  _GameContainer = null;
  static _instance = null;
  get GameMain() {
    return this._GameMain;
  }
  set GameMain(e) {
    this._GameMain = e;
  }
  get GameContainer() {
    return this._GameContainer;
  }
  set GameContainer(e) {
    this._GameContainer = e;
  }
  static get instance() {
    this._instance || (this._instance = new n());
    return this._instance;
  }
}
export default n.instance;