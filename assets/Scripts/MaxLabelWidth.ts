const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class MaxLabelWidth extends cc.Component {
  @property(cc.Float)
  maxWidth: number = 0;
  label = null;
  onLoad() {
    this.label = this.node.getComponent(cc.Label);
  }
  onEnable() {
    this.label.overflow = cc.Label.Overflow.NONE;
  }
  start() {}
  update() {
    if (this.label.node.width >= this.maxWidth) {
      this.label.node.width = this.maxWidth;
      this.label.overflow = cc.Label.Overflow.SHRINK;
    } else this.label.overflow = cc.Label.Overflow.NONE;
  }
}