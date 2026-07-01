const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class FollowLabelComp extends cc.Component {
  @property(cc.Label)
  label: cc.Label = null;
  @property(cc.Label)
  followLabel: cc.Label = null;
  start() {}
  update() {
    this.label.string = this.followLabel.string;
  }
}