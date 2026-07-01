const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class TypeWriterEffect extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;
  @property({
    tooltip: "每个字符显示的时间间隔（秒）",
    min: 0.05
  })
  speed = 0.1;
  originalText = "";
  currentIndex = 0;
  isTyping = false;
  onLoad() {
    this.label || (this.label = this.getComponent(cc.Label));
  }
  start() {
    this.label && this.label.string && this.startTyping(this.label.string);
  }
  startTyping(e) {
    this.label || this.onLoad();
    this.stopTyping();
    this.label.string = "";
    this.originalText = e;
    if (this.label && 0 !== this.originalText.length) {
      this.currentIndex = 0;
      this.isTyping = true;
      this.schedule(this.onTypeCharacter, this.speed);
    }
  }
  onTypeCharacter() {
    if (this.currentIndex < this.originalText.length) {
      this.label.string = this.originalText.slice(0, this.currentIndex + 1);
      this.currentIndex++;
    } else this.stopTyping();
  }
  stopTyping() {
    this.unschedule(this.onTypeCharacter);
    this.isTyping = false;
  }
  onDestroy() {
    this.stopTyping();
  }
}