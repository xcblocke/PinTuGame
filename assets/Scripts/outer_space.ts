const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class outer_space extends cc.Component {
  posx = 0;
  posy = 0;
  onLoad() {
    var e = this;
    if (this.node.getComponent(cc.Label)) {
      this._material = this.node.getComponent(cc.Label).getMaterial(0);
    } else {
      this.node.getComponent(cc.Sprite) && (this._material = this.node.getComponent(cc.Sprite).getMaterial(0));
    }
    this.node.on(cc.Node.EventType.TOUCH_MOVE, function (t) {
      e.posx += 0.05 * t.getDeltaX();
      e.posy += 0.05 * t.getDeltaY();
      e._material.setProperty("posx", e.posx);
      e._material.setProperty("posy", e.posy);
    });
  }
  start() {}
}