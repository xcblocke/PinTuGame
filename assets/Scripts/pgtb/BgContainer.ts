const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class BgContainer extends cc.Component {
  @property(cc.Node)
  bgNode: cc.Node = null;
  @property(cc.Material)
  material: cc.Material = null;
  init(e = 5, t = 6) {
    this.bgNode.width = this.node.width / e;
    this.bgNode.height = this.node.height / t;
    var o = this.bgNode.width,
      n = this.bgNode.height;
    this.material.setProperty("aspectRatio", this.bgNode.height / this.bgNode.width);
    this.node.removeAllChildren();
    for (var i = 0; i < e; i++) for (var a = 0; a < t; a++) {
      var r = cc.instantiate(this.bgNode);
      r.getComponent(cc.Sprite).setMaterial(0, this.material);
      r.x = i * o - this.node.width / 2 + o / 2;
      r.y = (t - a - 1) * n - this.node.height / 2 + n / 2;
      this.node.addChild(r);
    }
  }
  onLoad() {
    this.bgNode.parent = null;
  }
}