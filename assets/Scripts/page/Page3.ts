import { page3MockData } from "../mockData/page3MockData";
import { page2MockData } from "../mockData/page2MockData";
import EngineUtil from "../framework/Utils/EngineUtil";
import { resBasePath } from "../config";
import PageBase from "./PageBase";
import { GAME_NAME } from "../framework/SystemConfig";
const {
  ccclass,
  property
} = cc._decorator;
@ccclass
export default class Page3 extends PageBase {
  @property(cc.Node)
  popLayer: cc.Node = null;
  @property(cc.Node)
  empty: cc.Node = null;
  @property(cc.Node)
  content: cc.Node = null;
  @property(cc.Node)
  item: cc.Node = null;
  @property(cc.Label)
  title: cc.Label = null;
  @property(cc.Label)
  detailDesLb: cc.Label = null;
  @property(cc.Node)
  detailItem: cc.Node = null;
  bookData = [];
  onLoad() {
    super.onLoad.call(this);
  }
  initEvent() {}
  onDestroy() {}
  initData() {}
  initUI() {
    var e = localStorage.getItem(GAME_NAME + "_ids");
    if (e) {
      var t = JSON.parse(e),
        o = page2MockData.filter(function (e) {
          return t.includes(e.id);
        }),
        n = page3MockData.filter(function (e) {
          return t.includes(e.id);
        });
      this.bookData = [...o, ...n];
    }
    this.popLayer.active = false;
    this.content.removeAllChildren();
    this.empty.active = 0 === this.bookData.length;
    for (var i = 0; i < this.bookData.length; i++) {
      var a = cc.instantiate(this.item);
      a.parent = this.content;
      a.active = true;
      var p = this.bookData[i];
      a.name = "" + p.id;
      a.getChildByName("ly").getChildByName("labName").getComponent(cc.Label).string = p.name;
      a.getChildByName("ly").getChildByName("auth").getComponent(cc.Label).string = "【作者】：" + p.author;
      var f = Math.floor(30 * Math.random() + 70);
      a.getChildByName("labDesc").getComponent(cc.Label).string = "推荐值: " + f + "%";
      p.randomNum = f;
      EngineUtil.setNodeSprieFrame(a.getChildByName("image_side"), resBasePath + "book/" + p.img);
      cc.find("a_quanshu/lb", a).getComponent(cc.Label).string = "" + (i + 1);
      a.on("click", this.btnClick, this);
    }
  }
  setTitle(e) {
    this.title.string = e;
  }
  setTip() {}
  btnClick(e) {
    var t = e.node.name;
    this.popLayer.active = true;
    this.initBookDetailUI(t);
  }
  closePop() {
    this.popLayer.active = false;
  }
  initBookDetailUI(e) {
    this.curSelectIndex = e;
    var t = this.bookData.find(function (t) {
      return t.id === e;
    });
    this.detailItem.getChildByName("ly").getChildByName("labName").getComponent(cc.Label).string = t.name;
    this.detailItem.getChildByName("ly").getChildByName("auth").getComponent(cc.Label).string = "【作者】：" + t.author;
    this.detailItem.getChildByName("labDesc").getComponent(cc.Label).string = "推荐值: " + t.randomNum + "%";
    EngineUtil.setNodeSprieFrame(this.detailItem.getChildByName("image_side"), resBasePath + "book/" + t.img);
    this.detailDesLb.string = t.desc;
  }
  deleteBook(e) {
    var t = e.target.parent.name,
      o = localStorage.getItem(GAME_NAME + "_ids");
    o && (o = JSON.parse(o));
    o.splice(o.indexOf(t), 1);
    localStorage.setItem(GAME_NAME + "_ids", JSON.stringify(o));
    this.initUI();
  }
}