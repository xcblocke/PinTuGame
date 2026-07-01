const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class ScrollRectTest extends cc.Component {
  @property(cc.ScrollView)
  scrollView: cc.ScrollView = null;
  @property(cc.Node)
  view: cc.Node = null;
  dt = 0;
  oldChildrenCount = 0;
  oldY = 0;
  onLoad() {}
  update(e) {
    this.dt += e;
    this.dt < 0.1 || this.scrolling();
  }
  async scrolling() {
    var e, t, o, n;
    e = this.scrollView.content;
    if (this.oldChildrenCount === e.children.length && this.oldY === e.y) return;
    this.oldChildrenCount = e.children.length;
    this.oldY = e.y;
    t = e.y;
    o = this.view.height;
    n = this.view.y;
    e.children.forEach(function (e) {
      e.getChildByName("ui_node") && (e.ui_node = e.getChildByName("ui_node"));
      var i = e.y,
        a = e.height,
        r = i + a / 2 + t,
        c = i - a / 2 + t;
      e.ui_node.parent = r > n && c > n || r < n - o && c < n - o ? null : e;
    });
    return;
  }
  start() {}
}