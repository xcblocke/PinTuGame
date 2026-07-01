const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export class DynamicWord extends cc.Component {
  @property
  text = "";
  @property
  addonText = "";
  @property
  delay = 0;
  index = 0;
  time = 0;
  onLoad() {
    this.label = this.node.getComponent(cc.Label);
    this.label || (this.label = this.node.getComponent(cc.RichText));
  }
  setText(e, t, o) {
    this.text = e;
    this.addonText = t;
    this.delay = o;
  }
  update(e) {
    if (this.label && this.text && this.addonText) {
      this.time += e;
      if (this.time >= this.delay) {
        this.time = 0;
        this.index >= this.addonText.length && (this.index = 0);
        this.label.string = this.text + this.addonText.substring(0, ++this.index);
      }
    }
  }
}