class _gameNodePool {
  target = null;
  target_pool = new cc.NodePool();
  shooter = null;
  shooter_pool = new cc.NodePool();
  static _instance = null;
  static getInstance() {
    this._instance || (this._instance = new _gameNodePool());
    return this._instance;
  }
  init_target(e) {
    this.target = e;
  }
  get_target() {
    var e = this.target_pool.get();
    e || (e = cc.instantiate(this.target));
    e.opacity = 255;
    e.scale = 1;
    e.active = true;
    return e;
  }
  put_target(e) {
    e && this.target_pool.put(e);
  }
  init_shooter(e) {
    this.shooter = e;
  }
  get_shooter() {
    var e = this.shooter_pool.get();
    e || (e = cc.instantiate(this.shooter));
    e.opacity = 255;
    e.scale = 1;
    e.active = true;
    return e;
  }
  put_shooter(e) {
    e && this.shooter_pool.put(e);
  }
}
export default _gameNodePool.getInstance();