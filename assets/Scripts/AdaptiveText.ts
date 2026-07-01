const {
  ccclass,
  property,
  menu
} = cc._decorator;
@ccclass
@menu("自定义组件/AdaptiveText")
export default class AdaptiveText extends cc.Component {
  @property(cc.Integer)
  maxWidth: number = 0;
  originalFontSize = 0;
  curWidth = 0;
  lb = null;
  lastText = "";
  onLoad() {
    var e = this;
    this.lb = this.node.getComponent(cc.Label);
    this.lastText = this.lb.string;
    this.originalFontSize = this.node.getComponent(cc.Label).fontSize;
    setTimeout(function () {
      e.updateText();
    }, 0);
  }
  updateText() {
    if (this.node.width > this.maxWidth) {
      this.curWidth = this.node.width;
      var e = this.originalFontSize * (this.maxWidth / this.node.width);
      this.node.getComponent(cc.Label).fontSize = e;
    }
  }
  update() {
    if (this.lastText !== this.lb.string) {
      this.lastText = this.lb.string;
      this.updateText();
    }
  }
}